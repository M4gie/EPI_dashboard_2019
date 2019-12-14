'use strict'

const Service = use('App/Models/Service')
const ServiceUser = use('App/Models/ServiceUser')
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    let user = await auth.getUser()
    user = user.toJSON()

    const idUserServices = await ServiceUser
      .query()
      .where('user_id', user.id)
      .pluck('service_id')
    return await Service
      .query()
      .whereNotIn('id', idUserServices)
      .fetch()
  }

  /**
   * Create/save a new service.
   * POST services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const serviceData = request.only(['name', 'auth', 'banner'])
    return Service.create(serviceData)
  }

  /**
   * Update service details.
   * PUT or PATCH services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params
    const serviceData = request.only(['name', 'auth', 'banner'])
    const service = await Service.findOrFail(id)
    service.merge(serviceData)
    return service.save()
  }

  /**
   * Delete a service with id.
   * DELETE services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { id } = params
    const service = await Service.findOrFail(id)
    return service.delete()
  }

  async about({request}) {
    const time = Date.now()
    const services = await Service
      .query()
      .select('id', 'name')
      .setHidden(['id'])
      .with('widgets', (builder) => {
        builder
          .select('id', 'service_id', 'name', 'description')
          .setHidden(['id', 'service_id'])
          .with('params', (builder) => {
            builder
              .select('id', 'widget_id', 'name', 'type')
              .setHidden(['id', 'widget_id'])
          })
      })
      .fetch()

    return ({
      client: {
        host: request.ip()
      },
      server: {
        time: time,
        services
      }
    })
  }
}

module.exports = ServiceController

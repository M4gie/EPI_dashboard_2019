'use strict'

const ServiceUser = use('App/Models/ServiceUser')
const UserWidget = use('App/Models/UserWidget')
const ParamUserWidget = use('App/Models/ParamUserWidget')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with serviceusers
 */
class ServiceUserController {
  /**
   * Show a list of all serviceusers.
   * GET serviceusers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return await ServiceUser.all()
  }

  /**
   * Create/save a new serviceuser.
   * POST serviceusers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    let user = await auth.getUser()
    user = user.toJSON()
    const serviceUserData = request.only(['service_id'])
    serviceUserData['user_id'] = user.id
    return ServiceUser.create(serviceUserData)
  }

  /**
   * Display a single serviceuser.
   * GET serviceusers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update serviceuser details.
   * PUT or PATCH serviceusers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth }) {
    const { id } = params
    let user = await auth.getUser()
    user = user.toJSON()
    const serviceUserData = request.only(['service_id', 'token'])
    serviceUserData['user_id'] = user.id
    const serviceUser = await ServiceUser.findOrFail(id)
    serviceUser.merge(serviceUserData)
    return serviceUser.save()
  }

  /**
   * Delete a serviceuser with id.
   * DELETE serviceusers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { id } = params
    const serviceUser = await ServiceUser.findOrFail(id)
    const idUserWidget = await UserWidget
      .query()
      .where('service_user_id', id)
      .pluck('id')
    await ParamUserWidget
      .query()
      .whereIn('user_widget_id', idUserWidget)
      .delete()
    await UserWidget
      .query()
      .whereIn('id', idUserWidget)
      .delete()
    return serviceUser.delete()
  }
}

module.exports = ServiceUserController

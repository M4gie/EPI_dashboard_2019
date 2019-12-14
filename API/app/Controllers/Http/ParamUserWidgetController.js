'use strict'

const ServiceUser = use('App/Models/ParamUserWidget')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with paramuserwidgets
 */
class ParamUserWidgetController {
  /**
   * Show a list of all paramuserwidgets.
   * GET paramuserwidgets
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
   * Create/save a new paramuserwidget.
   * POST paramuserwidgets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const paramUserWidgetData = request.only(['user_widget_id', 'param_widget_id', 'value'])
    return ServiceUser.create(paramUserWidgetData)
  }

  /**
   * Display a single paramuserwidget.
   * GET paramuserwidgets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update paramuserwidget details.
   * PUT or PATCH paramuserwidgets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params
    const paramUserWidgetData = request.only(['user_widget_id', 'param_widget_id  ', 'value'])
    const paramUserWidget = await ServiceUser.findOrFail(id)
    paramUserWidget.merge(paramUserWidgetData)
    return paramUserWidget.save()
  }

  /**
   * Delete a paramuserwidget with id.
   * DELETE paramuserwidgets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { id } = params
    const paramUserWidget = await ServiceUser.findOrFail(id)
    return paramUserWidget.delete()
  }
}

module.exports = ParamUserWidgetController

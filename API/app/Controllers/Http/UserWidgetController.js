'use strict'

const UserWidget = use('App/Models/UserWidget')
const User = use('App/Models/User')
const Service = use('App/Models/Service')
const ServiceUser = use('App/Models/ServiceUser')
const ParamWidget = use('App/Models/ParamWidget')
const ParamUserWidget = use('App/Models/ParamUserWidget')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with userwidgets
 */
class UserWidgetController {
  /**
   * Show a list of all userwidgets.
   * GET userwidgets
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
      .whereIn('id', idUserServices)
      .select('id', 'name')
      .setHidden(['id'])
      .with('widgets', (builder) => {
        builder
          .select('id', 'service_id', 'name', 'description')
          .setHidden(['service_id'])
      })
      .with('serviceUsers', (builder) => {
        builder
          .select('id', 'service_id')
          .where('user_id', user.id)
          .setHidden(['service_id'])
      })
      .fetch()
  }

  /**
   * Create/save a new userwidget.
   * POST userwidgets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const userWidgetData = request.only(['service_user_id', 'widget_id', 'order'])
    const userWidget = await UserWidget.create(userWidgetData)
    userWidget.order = userWidget.id
    userWidget.save()
    const defaultValues = await ParamWidget
      .query()
      .select('id', 'default_value')
      .where('widget_id', userWidgetData.widget_id)
      .fetch()
    for (const defaultValue of defaultValues.toJSON()) {
      await ParamUserWidget.create({
        user_widget_id: userWidget.id,
        param_widget_id: defaultValue.id,
        value: defaultValue.default_value
      })
    }
    return userWidget
  }

  /**
   * Update userwidget details.
   * PUT or PATCH userwidgets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params
    const paramsWidget = request.only(['params'])
    const userWidget = await UserWidget.findOrFail(id)
    await userWidget
      .paramUserWidget()
      .where('user_widget_id', userWidget.id)
      .delete()
    return userWidget.paramUserWidget().createMany(paramsWidget.params)
  }

  /**
   * Delete a userwidget with id.
   * DELETE userwidgets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const { id } = params
    const userWidget = await UserWidget.findOrFail(id)
    await userWidget
      .paramUserWidget()
      .where('user_widget_id', userWidget.id)
      .delete()
    return userWidget.delete()
  }

  /**
   * Update userwidget details.
   * PUT or PATCH userwidgets/:id/order
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async order ({ params, request, response }) {
    const { id } = params
    const paramsWidget = request.only(['order'])
    const userWidget = await UserWidget.findOrFail(id)
    userWidget.merge(paramsWidget)
    return userWidget.save()
  }
}

module.exports = UserWidgetController

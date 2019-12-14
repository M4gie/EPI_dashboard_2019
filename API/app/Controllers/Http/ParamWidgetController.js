'use strict'

const WidgetParam = use('App/Models/ParamWidget')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with paramwidgets
 */
class ParamWidgetController {
  /**
   * Show a list of all paramwidgets.
   * GET paramwidgets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return await WidgetParam.all()
  }

  /**
   * Create/save a new paramwidget.
   * POST paramwidgets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const WidgetParamData = request.only(["user_widget_id", "widget_param_id", "value"]);
    return WidgetParam.create(WidgetParamData);
  }

  /**
   * Display a single paramwidget.
   * GET paramwidgets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update paramwidget details.
   * PUT or PATCH paramwidgets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const {id} = params;
    const WidgetParamData = request.only(["user_widget_id", "widget_param_id", "value"]);
    const widgetParam = await WidgetParam.findOrFail(id);
    widgetParam.merge(WidgetParamData);
    return widgetParam.save()
  }

  /**
   * Delete a paramwidget with id.
   * DELETE paramwidgets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const {id} = params;
    const widgetParam = await WidgetParam.findOrFail(id);
    return widgetParam.delete();
  }
}

module.exports = ParamWidgetController

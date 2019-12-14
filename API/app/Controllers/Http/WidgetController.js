'use strict'

const Widget = use('App/Models/Widget')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with widgets
 */
class WidgetController {
  /**
   * Show a list of all widgets.
   * GET widgets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return await Widget.all()
  }

  /**
   * Create/save a new widget.
   * POST widgets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const widgetData = request.only(["service_id", "name", "description"]);
    return Widget.create(widgetData);
  }

  /**
   * Display a single widget.
   * GET widgets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update widget details.
   * PUT or PATCH widgets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const {id} = params;
    const widgetData = request.only(["service_id", "name", "description"]);
    const widget = await Widget.findOrFail(id);
    widget.merge(widgetData);
    return widget.save()
  }

  /**
   * Delete a widget with id.
   * DELETE widgets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const {id} = params;
    const widget = await Widget.findOrFail(id);
    return widget.delete();
  }
}

module.exports = WidgetController

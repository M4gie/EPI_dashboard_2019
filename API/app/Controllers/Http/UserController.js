'use strict'

const ServiceUser = use('App/Models/ServiceUser')
const UserWidget = use('App/Models/UserWidget')
const User = use('App/Models/User')

class UserController {

  async userWidgets ({ auth }) {
    let user = await auth.getUser()
    user = user.toJSON()

    const idUserService = await ServiceUser
      .query()
      .where('user_id', user.id)
      .pluck('id')

    let userWidgets = await UserWidget
      .query()
      .select('id', 'order', 'widget_id', 'service_user_id')
      .setHidden(['service_id', 'user_id'])
      .with('paramUserWidget', (builder) => {
        builder
          .select('value', 'id', 'user_widget_id', 'param_widget_id')
          .setHidden(['user_widget_id', 'param_widget_id'])
          .with('paramWidget', (builder) => {
            builder
              .select('name', 'id', 'type')
          })
      })
      .with('userService', (builder) => {
        builder
          .select('id', 'service_id', 'user_id')
          .with('service', (builder) => {
            builder
              .select('id', 'name', 'banner')
          })
      })
      .with('widget', (builder) => {
        builder
          .select('id', 'name', 'description')
          .setHidden(['id'])
      })
      .whereIn('service_user_id', idUserService)
      .orderBy('order', 'asc')
      .fetch()
    userWidgets = userWidgets.toJSON()

    return (userWidgets.map((widget => {
      return {
        idUserWidget: widget.id,
        order: widget.order,
        widgetName: widget.widget.name,
        description: widget.widget.description,
        serviceName: widget.userService.service.name,
        serviceBanner: widget.userService.service.banner,
        params: widget.paramUserWidget.map((param) => {
          return ({
            idParamWidget: param.paramWidget.id,
            name: param.paramWidget.name,
            type: param.paramWidget.type,
            value: param.value,
            idParamUserWidget: param.id
          })
        })
      }
    })))
  }

  async userServices ({ auth }) {
    let user = await auth.getUser()
    user = user.toJSON()

    return await ServiceUser
      .query()
      .select('*')
      .with('service', (builder) => {
        builder
          .select('id', 'banner')
      })
      .setHidden(['widget_id'])
      .where('user_id', '=', user.id)
      .fetch()
  }

  async userToken ({ auth, request }) {
    const { service } = request.only(['service'])
    let user = await auth.getUser()
    user = user.toJSON()

    return User
      .query()
      .select(`${service}_token`)
      .where('id', '=', user.id)
      .first()
  }

}

module.exports = UserController

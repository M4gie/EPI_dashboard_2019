'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserWidget extends Model {

  paramUserWidget () {
    return this.hasMany('App/Models/ParamUserWidget')
  }

  widget () {
    return this.belongsTo('App/Models/Widget')
  }

  userService () {
    return this.belongsTo('App/Models/ServiceUser')
  }

}

module.exports = UserWidget

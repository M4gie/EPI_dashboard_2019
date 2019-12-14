'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ServiceUser extends Model {

  userWidgets () {
    return this.hasMany('App/Models/UserWidget')
  }

  service () {
    return this.belongsTo('App/Models/Service')
  }

}

module.exports = ServiceUser

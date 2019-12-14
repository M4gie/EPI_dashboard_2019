'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Service extends Model {

  widgets () {
    return this.hasMany('App/Models/Widget')
  }

  serviceUsers () {
    return this.hasMany('App/Models/ServiceUser')
  }

}

module.exports = Service

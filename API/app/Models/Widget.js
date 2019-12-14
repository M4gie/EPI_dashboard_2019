'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Widget extends Model {

  params () {
    return this.hasMany('App/Models/ParamWidget')
  }

}

module.exports = Widget

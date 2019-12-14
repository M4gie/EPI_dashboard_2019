'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ParamWidget extends Model {

  paramUserWidgets () {
    return this.hasMany('App/Models/ParamUserWidget')
  }

}

module.exports = ParamWidget

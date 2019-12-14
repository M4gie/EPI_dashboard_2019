'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ParamUserWidget extends Model {

  paramWidget () {
    return this.belongsTo('App/Models/ParamWidget')
  }
}

module.exports = ParamUserWidget

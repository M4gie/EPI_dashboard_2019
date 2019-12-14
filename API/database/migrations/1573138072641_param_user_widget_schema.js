'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParamUserWidgetSchema extends Schema {
  up () {
    this.create('param_user_widgets', (table) => {
      table.increments()
      table.string('value')
      table.integer('user_widget_id').notNullable().unsigned()
      table.foreign('user_widget_id').references('user_widgets.id')
      table.integer('param_widget_id').notNullable().unsigned()
      table.foreign('param_widget_id').references('param_widgets.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('param_user_widgets')
  }
}

module.exports = ParamUserWidgetSchema

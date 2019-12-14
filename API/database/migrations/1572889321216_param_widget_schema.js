'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ParamWidgetSchema extends Schema {
  up () {
    this.create('param_widgets', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('type', 20).notNullable()
      table.string('default_value', 200)
      table.integer('widget_id').notNullable().unsigned()
      table.foreign('widget_id').references('widgets.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('param_widgets')
  }
}

module.exports = ParamWidgetSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WidgetSchema extends Schema {
  up () {
    this.create('widgets', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('description', 120)
      table.integer('service_id').notNullable().unsigned()
      table.foreign('service_id').references('services.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('widgets')
  }
}

module.exports = WidgetSchema

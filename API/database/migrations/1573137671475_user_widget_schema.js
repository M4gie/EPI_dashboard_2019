'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserWidgetSchema extends Schema {
  up () {
    this.create('user_widgets', (table) => {
      table.increments()
      table.float('order')
      table.integer('widget_id').notNullable().unsigned()
      table.foreign('widget_id').references('widgets.id')
      table.integer('service_user_id').notNullable().unsigned()
      table.foreign('service_user_id').references('service_users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_widgets')
  }
}

module.exports = UserWidgetSchema

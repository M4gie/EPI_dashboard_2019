'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceUserSchema extends Schema {
  up () {
    this.create('service_users', (table) => {
      table.increments()
      table.string('token', 400)
      table.integer('service_id').notNullable().unsigned()
      table.foreign('service_id').references('services.id')
      table.integer('user_id').notNullable().unsigned()
      table.foreign('user_id').references('users.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('service_users')
  }
}

module.exports = ServiceUserSchema

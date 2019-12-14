'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
 const Factory = use('Factory')

// Service blueprint
Factory.blueprint('App/Models/Service', (faker, i, data) => {
  return {
    name: data.name,
    banner: data.banner,
    auth: data.auth
  }
})

// Widget blueprint
Factory.blueprint('App/Models/Widget', (faker, i, data) => {
  return {
    name: data.name,
    description: data.description,
  }
})

// Param Widget blueprint
Factory.blueprint('App/Models/ParamWidget', (faker, i, data) => {
  return {
    widget_id: data.widget_id,
    name: data.name,
    type: data.type,
  }
})

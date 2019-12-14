'use strict'

/*
|--------------------------------------------------------------------------
| ServiceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const WidgetParam = use('App/Models/ParamWidget')

class ServiceSeeder {
  async run () {

    const services = [
      {
        name: 'youtube',
        banner: 'youtube',
        auth: false,
        widgets: [
          {
            name: 'subscribers',
            description: 'Affiche les statistiques d\'une chaîne',
            params: [
              { name: 'Rafraîchissement (en secondes)', type: 'integer', default_value: 20 },
              { name: 'Chaîne', type: 'string', default_value: 'aMOODIEsqueezie' },
            ]
          },
          {
            name: 'view',
            description: 'Affiche les statistiques d\'une vidéo',
            params: [
              { name: 'Rafraîchissement (en secondes)', type: 'integer', default_value: 20 },
              { name: 'URL de la vidéo', type: 'string', default_value: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk' },
            ]
          },
        ]
      },
      {
        name: 'meteo',
        banner: 'weather',
        auth: false,
        widgets: [
          {
            name: 'température',
            description: 'Affiche la température d\'une ville',
            params: [
              { name: 'Rafraîchissement (en secondes)', type: 'integer', default_value: 20 },
              { name: 'Ville', type: 'string', default_value: 'Lille' },
            ]
          },
        ]
      },
      {
        name: 'twitch',
        banner: 'twitch',
        auth: false,
        widgets: [
          {
            name: 'stream',
            description: 'Affiche les informations d\'un stream',
            params: [
              { name: 'Rafraîchissement (en secondes)', type: 'integer', default_value: 20 },
              { name: 'Nom d’utilisateur', type: 'string', default_value: 'FailArmy' },
            ]
          },
          {
            name: 'user',
            description: 'Affiche les informations d\'un streamer',
            params: [
              { name: 'Rafraîchissement (en secondes)', type: 'integer', default_value: 20 },
              { name: 'Nom d’utilisateur', type: 'string', default_value: 'juyinsama' },
            ]
          }
        ],
      },
      {
        name: 'github',
        banner: 'github',
        auth: true,
        widgets: [
          {
            name: 'ownrepos',
            description: 'Affiche les dépôts de l\'utilisateur connecté',
            params: [
              { name: 'Rafraîchissement (en secondes)', type: 'integer', default_value: 20 },
              { name: 'Ordre des dépôts (ascendant ou descendant)', type: 'string', default_value: 'ascendant' },
            ]
          },
          {
            name: 'ownstars',
            description: 'Affiche les dépôts en favoris de l\'utilisateur connecté',
            params: [
              { name: 'Rafraîchissement (en secondes)', type: 'integer', default_value: 20 },
              { name: 'Ordre des dépôts (ascendant ou descendant)', type: 'string', default_value: 'ascendant' },
            ]
          },
          {
            name: 'ownfollowers',
            description: 'Affiche les followers de l\'utilisateur connecté',
            params: [
              { name: 'Rafraîchissement (en secondes)', type: 'integer', default_value: 20 },
            ]
          }
        ]
      },
      {
        name: 'wikipedia',
        banner: 'wikipedia',
        auth: false,
        widgets: [
          {
            name: 'search',
            description: 'Affiche une recherche Wikipédia',
            params: [
              { name: 'Rafraîchissement (en secondes)', type: 'integer', default_value: 20 },
              { name: 'Recherche', type: 'string', default_value: 'Maubeuges' },
            ]
          },
        ]
      },
      {
        name: 'cinema',
        banner: 'cinema',
        auth: false,
        widgets: [
          {
            name: 'search',
            description: 'Affiche les informations d\'un film',
            params: [
              { name: 'Rafraîchissement (en secondes)', type: 'integer', default_value: 20 },
              { name: 'Nom du film', type: 'string', default_value: 'Shutter Island' },
            ]
          },
          {
            name: 'series',
            description: 'Affiche les informations d\'une série',
            params: [
              { name: 'Rafraîchissement (en secondes)', type: 'integer', default_value: 20 },
              { name: 'Nom de la série', type: 'string', default_value: 'Peaky Blinders' },
            ]
          },
        ]
      },
    ];

    for (const serviceData of services) {
      const service = await Factory
        .model('App/Models/Service')
        .create({
          name: serviceData.name,
          banner: serviceData.banner,
          auth: serviceData.auth
        })
      for (const widgetData of serviceData.widgets) {
        const MakeWidget = await Factory.model('App/Models/Widget').make({
          name: widgetData.name,
          description: widgetData.description
        })
        await service.widgets().save(MakeWidget)
        for (const paramWidgetData of widgetData.params) {
          await WidgetParam.create({ widget_id: MakeWidget.id, name: paramWidgetData.name, type: paramWidgetData.type, default_value: paramWidgetData.default_value })
        }
      }
    }
  }
}

module.exports = ServiceSeeder

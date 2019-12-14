'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/* LOGIN ROUTES */

Route.get('login/oauth', 'LoginController.redirect')

Route.get('authenticated/facebook', 'LoginController.callbackFB')

Route.get('authenticated/google', 'LoginController.callbackGG')

Route.get('authenticated/twitter', 'LoginController.callbackTW')

Route.get('authenticated/github', 'LoginController.callbackGH')

Route
  .post('/login', 'LoginController.login')
  .validator('LoginUser')

Route
  .post('/register', 'LoginController.register')
  .validator('RegisterUser')

/* SERVICES ROUTES */

Route.resource('services', 'ServiceController')
  .middleware(['auth'])
  .apiOnly()

Route.get('/about.json', 'ServiceController.about')

/* WIDGET ROUTES */

Route.resource('widgets', 'WidgetController')
  .middleware(['auth'])
  .apiOnly()

/* WIDGET PARAM ROUTES */

Route.resource('param-widget', 'ParamWidgetController')
  .middleware(['auth'])
  .apiOnly()

/* USER SERVICE ROUTES */

Route.resource('userservices', 'ServiceUserController')
  .middleware(['auth'])
  .apiOnly()

/* USER WIDGET ROUTES */

Route.resource('userwidgets', 'UserWidgetController')
  .middleware(['auth'])
  .apiOnly()

Route.get('userwidgets/:id/params', 'UserWidgetController.params')
  .middleware(['auth'])

Route.put('userwidgets/:id/order', 'UserWidgetController.order')
  .middleware(['auth'])

/* USER PARAM WIDGET ROUTES */

Route.resource('user/param-user-widgets', 'ParamUserWidgetController')
  .middleware(['auth'])
  .apiOnly()

/* USER ROUTES */

Route.get('user/widgets', 'UserController.userWidgets')
  .middleware(['auth'])
Route.get('user/services', 'UserController.userServices')
  .middleware(['auth'])

Route.get('user/token', 'UserController.userToken')

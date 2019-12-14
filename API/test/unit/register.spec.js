'use strict'

const { test, trait } = use('Test/Suite')('Register')
trait('Test/ApiClient')

test('Check response status / Email: Null, Password: Null and Confirm password: Null', async ({ client }) => {
  const response = await client.post('/register').end()
  response.assertStatus(400)
})

test('Check response text / Email: Null, Password: Null and Confirm password: Null', async ({ client }) => {
  const response = await client.post('/register')
    .header('accept', 'application/json')
    .end()
  response.assertJSONSubset([{
    message: 'Un e-mail est requis.',
    field: 'email',
    validation: 'required',
  }])
})

test('Check response status / Email: fill, Password: Null and Confirm password: Null', async ({ client }) => {
  const response = await client.post('/register').end()
  response.assertStatus(400)
})

test('Check response text / Email: fill, Password: Null and Confirm password: Null', async ({ client, assert }) => {
  const response = await client.post('/register')
    .header('accept', 'application/json')
    .send({
      email: 'abel@clapota.fr',
    })
    .end()
  response.assertJSONSubset([{
    message: 'Un mot de passe est requis.',
    field: 'password',
    validation: 'required',
  }])
})

test('Check response status / Email: fill, Password: fill and Confirm password: Null', async ({ client }) => {
  const response = await client.post('/register').end()
  response.assertStatus(400)
})

test('Check response text / Email: fill, Password: fill and Confirm password: Null', async ({ client, assert }) => {
  const response = await client.post('/register')
    .header('accept', 'application/json')
    .send({
      email: 'abel@clapota.fr',
      password: 'AbusyIsBusy'
    })
    .end() 
  response.assertJSONSubset([{
    message: 'Une confirmation de ton mot de passe est requise.',
    field: 'password_confirmation',
    validation: 'required',
  }])
})


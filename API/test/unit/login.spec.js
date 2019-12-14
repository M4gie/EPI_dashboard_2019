'use strict'

const { test, trait } = use('Test/Suite')('Login')
trait('Test/ApiClient')

test('Check response status / Email: Null and Password: Null', async ({ client }) => {
  const response = await client.post('/login').end()
  response.assertStatus(400)
})

test('Check response text / Email: Null and Password: Null', async ({ client, assert }) => {
  const response = await client.post('/login')
    .header('accept', 'application/json')
    .end()
  response.assertJSONSubset([{
    message: 'Un e-mail est requis.',
    field: 'email',
    validation: 'required',
  }])
})

test('Check response status / Email: fill and Password: Null', async ({ client }) => {
  const response = await client.post('/login')
    .send({
      email: 'abel@clapota.fr',
    })
    .end()
  response.assertStatus(400)
})

test('Check response text / Email: fill and Password: Null', async ({ client, assert }) => {
  const response = await client.post('/login')
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

test('Check response status / Email: fill and Password: fill but unknown user', async ({ client }) => {
  const response = await client.post('/login')
    .send({
      email: 'abel@clapota.fr',
      password: 'AbusyIsBusy'
    })
    .end()
  response.assertStatus(400)
})

test('Check response text / Email: fill and Password: fill but unknown user', async ({ client, assert }) => {
  const response = await client.post('/login')
    .header('accept', 'application/json')
    .send({
      email: 'abel@clapota.fr',
      password: 'AbusyIsBusy'
    })
    .end()
  response.assertJSONSubset([{
    message: 'E-mail inconnu',
    field: 'email',
  }])
})

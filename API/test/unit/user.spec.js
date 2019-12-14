'use strict'

const { test, trait } = use('Test/Suite')('User')
trait('Test/ApiClient')

test('Check response status / User not login', async ({ client }) => {
  const response = await client.get('user/widgets').end()
  response.assertStatus(401)
})

test('Check response text / User not login', async ({ client, assert }) => {
  const response = await client.get('user/widgets').end()
  assert.equal("InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided", response.text)
})

test('Check response status / User not login', async ({ client }) => {
  const response = await client.get('user/services').end()
  response.assertStatus(401)
})

test('Check response text / User not login', async ({ client, assert }) => {
  const response = await client.get('user/services').end()
  assert.equal("InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided", response.text)
})

test('Check response status / User not login', async ({ client }) => {
  const response = await client.get('userservices').end()
  response.assertStatus(401)
})

test('Check response text / User not login', async ({ client, assert }) => {
  const response = await client.get('userservices').end()
  assert.equal("InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided", response.text)
})

test('Check response status / User not login', async ({ client }) => {
  const response = await client.post('userservices').end()
  response.assertStatus(401)
})

test('Check response text / User not login', async ({ client, assert }) => {
  const response = await client.post('userservices').end()
  assert.equal("InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided", response.text)
})

test('Check response status / User not login', async ({ client }) => {
  const response = await client.delete('userservices/1').end()
  response.assertStatus(401)
})

test('Check response text / User not login', async ({ client, assert }) => {
  const response = await client.delete('userservices/1').end()
  assert.equal("InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided", response.text)
})

test('Check response status / User not login', async ({ client }) => {
  const response = await client.get('userwidgets').end()
  response.assertStatus(401)
})

test('Check response text / User not login', async ({ client, assert }) => {
  const response = await client.get('userwidgets').end()
  assert.equal("InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided", response.text)
})

test('Check response status / User not login', async ({ client }) => {
  const response = await client.post('userwidgets').end()
  response.assertStatus(401)
})

test('Check response text / User not login', async ({ client, assert }) => {
  const response = await client.post('userwidgets').end()
  assert.equal("InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided", response.text)
})

test('Check response status / User not login', async ({ client }) => {
  const response = await client.delete('userwidgets/1').end()
  response.assertStatus(401)
})

test('Check response text / User not login', async ({ client, assert }) => {
  const response = await client.delete('userwidgets/1').end()
  assert.equal("InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided", response.text)
})

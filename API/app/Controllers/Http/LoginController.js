'use strict'

const User = use('App/Models/User')
const Env = use('Env')

class LoginController {

  async login ({ request, auth, response }) {
    let { email, password } = request.only(['email', 'password'])
    email = email.toLowerCase()
    try {
      const jwt = await auth.attempt(email, password)
      return response.json({ access_token: jwt })
    } catch (e) {
      response.status(400)
      switch (e.code) {
        case 'E_USER_NOT_FOUND':
          return response.json([{ message: 'E-mail inconnu', field: 'email' }])
        case 'E_PASSWORD_MISMATCH':
          return response.json([{ message: 'Mot de passe incorrect', field: 'password' }])
        default:
          return response.json([{ message: 'Le pire est arrivé (Login)' }])
      }
    }
  }

  async register ({ request, auth, response }) {
    const userInfo = request.only(['email', 'password'])
    userInfo.email = userInfo.email.toLowerCase()
    const user = await User.create(userInfo)
    try {
      let accessToken = await auth.generate(user)
      return response.json({ 'email': user.email, 'access_token': accessToken })
    } catch (e) {
      return response.json([{ message: 'Le pire est arrivé (Login)' }])
    }
  }

  async redirect ({ ally, request }) {
    const oAuth = request.only(['name'])
    return ally.driver(oAuth.name).getRedirectUrl()
  }

  async callbackFB ({ ally, auth, response }) {
    return this.createUserOAuth({
      oAuthName: 'facebook',
      ally: ally,
      auth: auth,
      response: response
    })
  }

  async callbackGG ({ ally, auth, response }) {
    return this.createUserOAuth({
      oAuthName: 'google',
      ally: ally,
      auth: auth,
      response: response
    })
  }

  async callbackTT ({ ally, auth, response }) {
    return this.createUserOAuth({
      oAuthName: 'twitter',
      ally: ally,
      auth: auth,
      response: response
    })
  }

  async callbackGH ({ ally, auth, response }) {
    return this.createUserOAuth({
      oAuthName: 'github',
      ally: ally,
      auth: auth,
      response: response
    })
  }

  async createUserOAuth ({ oAuthName, response, auth, ally }) {
    try {
      const newUser = await ally.driver(oAuthName).getUser()
      const userDetails = {
        email: newUser.getEmail(),
      }
      userDetails[`${oAuthName}_token`] = newUser.getAccessToken()
      const whereClause = {
        email: newUser.getEmail()
      }
      const user = await User.findOrCreate(whereClause, userDetails)
      user.merge(userDetails)
      user.save()
      const token = await auth.generate(user)
      return response.route(`${Env.get('FRONT_URL', 'http://localhost:8081')}/validation?token=${token.token}`)
    } catch (error) {
      return error
    }
  }

}

module.exports = LoginController

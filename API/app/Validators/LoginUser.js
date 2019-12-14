'use strict'

class LoginUser {

  get rules() {
    return {
      email: 'required',
      password: 'required',
    }
  }

  get messages() {
    return {
      "email.required": "Un e-mail est requis.",
      "password.required": "Un mot de passe est requis.",
    }
  }

}

module.exports = LoginUser

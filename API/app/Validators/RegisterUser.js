'use strict'

class RegisterUser {

  get rules() {
    return {
      email: 'unique:users|required|email|max:321',
      password: 'required|max:50|min:8',
      password_confirmation: 'required|same:password'
    }
  }

  get messages() {
    return {
      "email.required": "Un e-mail est requis.",
      "email.unique": "Cet e-mail est déjà utilisé.",
      "email.max": "Ton e-mail ne doit pas faire plus de 320 caractères.",
      "email.email": "Ton e-mail n'est pas valide.",
      "password.required": "Un mot de passe est requis.",
      "password.max": "Ton mot de passe ne doit pas faire plus de 50 caractères.",
      "password.min": "Ton mot de passe doit faire au moins 8 caractères.",
      "password_confirmation.required": "Une confirmation de ton mot de passe est requise.",
      "password_confirmation.same": "Les mots de passe doivent être identiques."
    }
  }
}

module.exports = RegisterUser

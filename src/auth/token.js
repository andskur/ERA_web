// var express = require('express')
// var _ = require('lodash')
var jwt = require('jsonwebtoken')

// var app = module.exports = express.Router();

export default {
  createIdToken (seed, privatkey) {
    // console.log(seed)
    // console.log(privatkey)
    return jwt.sign({ seed: seed }, privatkey, { expiresIn: 60 * 60 * 5 })
  },

  createAccessToken (privatkey) {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        scope: 'full_access',
        jti: this.genJti(), // unique identifier for the token
        alg: 'HS256'
      }, privatkey)
  },

  genJti () {
    let jti = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 16; i++) {
      jti += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return jti
  }
}

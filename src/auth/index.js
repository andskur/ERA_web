import axios from 'axios'

const API_URL = 'http://localhost:3001/'
// const LOGIN_URL = API_URL + 'sessions/create/'
const SIGNUP_URL = API_URL + 'users/'

import token from './token.js'

import crypto from '../crypto/index.js'

export default {

  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login (context, credentials) {
    var seed = credentials.seed
    // var passw = creds.password

    // console.log(credentials)

    crypto.generateKeys(seed)

    var privatekey = crypto.base58.AccountPrivateKey

    window.localStorage.setItem('id_token', token.createIdToken(seed, privatekey))
    window.localStorage.setItem('access_token', token.createAccessToken(privatekey))

    this.user.authenticated = true

    axios.defaults.headers.common['Authorization'] = 'Bearer' + window.localStorage.getItem('access_token')

/*
    axios.get('http://localhost:8080/api/blocks/last')
      .then(response => {
        if (response.status !== 200) {
          this.error = response.statusText
          return
        }

        this.last = response.data

        this.fromheight = this.last.height - 29
      })
      .catch(error => {
       // Request failed.
        console.log('error', error.response)
        this.error = error.response.statusText
      })
*/
/*
    context.$http.post(LOGIN_URL, creds, (data) => {
      window.localStorage.setItem('id_token', data.id_token)
      window.localStorage.setItem('access_token', data.access_token)

      this.user.authenticated = true

      // Redirect to a specified route
      if (redirect) {
        // router.go(redirect)
      }
    }).error((err) => {
      context.error = err
    })
    */
  },

  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      window.localStorage.setItem('id_token', data.id_token)
      window.localStorage.setItem('access_token', data.access_token)

      this.user.authenticated = true

      if (redirect) {
        // router.go(redirect)
      }
    }).error((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout () {
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('access_token')
    this.user.authenticated = false
    axios.defaults.headers.common['Authorization'] = ''
  },

  checkAuth () {
    var jwt = window.localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
    return this.user.authenticated
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + window.localStorage.getItem('access_token')
    }
  }
}

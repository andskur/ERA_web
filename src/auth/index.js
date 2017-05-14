import axios from 'axios'
// import nacl from 'tweetnacl'

import token from './token.js'
import crypto from '../crypto/index.js'

const API_URL = 'http://localhost:8080/api/'

export default {

  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login (context, credentials) {
    var seed = credentials.seed
    var passw = credentials.password

    // console.log(credentials)

    crypto.generateKeys(seed)

    var privatekey = crypto.base58.AccountPrivateKey
    var publickey = crypto.base58.AccountPublicKey

    window.localStorage.setItem('id_token', token.createIdToken(seed, privatekey))
    window.localStorage.setItem('access_token', token.createAccessToken(privatekey))
    window.localStorage.setItem('privatekey', privatekey)
    window.localStorage.setItem('publickey', publickey)

    axios.post(API_URL + '/wallet/unlock', {
      password: passw
    })
    .then(function (response) {
      console.log(response)

      axios.defaults.headers.common['Authorization'] = 'Bearer' + window.localStorage.getItem('access_token')
      this.user.authenticated = true
    })
    .catch(function (error) {
      console.log(error)
      return
    })

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

  createWallet (seed, password, walletsCount) {
    crypto.generateKeys(seed)

    // create keypair
    var privatekey = crypto.base58.AccountPrivateKey
    var publickey = crypto.base58.AccountPublicKey

    // create jwt
    window.localStorage.setItem('id_token', token.createIdToken(seed, privatekey))
    window.localStorage.setItem('access_token', token.createAccessToken(privatekey))

    var wallet = {
      id: walletsCount + 1,
      seed: seed,
      password: password,
      keys: {
        private: privatekey,
        public: publickey
      }
    }

    return wallet

    // window.localStorage.setItem('privatekey', privatekey)
    // window.localStorage.setItem('publickey', publickey)

    // axios.defaults.headers.common['Authorization'] = 'Bearer' + window.localStorage.getItem('access_token')

    /*
    axios.post(API_URL + 'wallet', {
      seed: seed,
      password: password,
      recover: true
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
    */
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
      return
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

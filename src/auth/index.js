import axios from 'axios'
import _ from 'lodash'
import token from './token.js'
import crypto from '../crypto/index.js'

// const API_URL = 'http://localhost:8080/api/'

export default {

  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login (context, credentials) {
    var seed = credentials.seed
    var passw = credentials.password

    var wallets = context.$store.state.wallets
    var walletSearch = {seed: seed}
    var wallet = _.find(wallets, walletSearch)

    var errorText = 'The username or password don\'t match'
    if (!wallet || wallet.password !== passw) {
      context.response.target = 'password'
      context.response.data = errorText
      return
    }

    // create jwt
    var privatekey = wallet.keys.private
    window.localStorage.setItem('id_token', token.createIdToken(seed, privatekey))
    window.localStorage.setItem('access_token', token.createAccessToken(privatekey))

    axios.defaults.headers.common['Authorization'] = 'Bearer' + window.localStorage.getItem('access_token')

    return wallet
  },

  createWallet (seed, password, walletsCount) {
    var address = crypto.createAddress(seed)
    // crypto.generateKeys(seed)

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
      address: address,
      keys: {
        private: privatekey,
        public: publickey
      }
    }

    axios.defaults.headers.common['Authorization'] = 'Bearer' + window.localStorage.getItem('access_token')
    return wallet
  },

  // To log out, we just need to remove the token
  logout () {
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem('activeWallet')
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

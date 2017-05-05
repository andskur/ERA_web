<template>
  <!-- <form class="ui form loginForm"  @submit.prevent="createSeed"> -->
  <form v-if=!base58.AccountSeed class="ui form loginForm"  @submit.prevent="createSeed">

    <div class="input-group">
      <span class="input-group-addon"><i class="fa fa-lock"></i></span>
      <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
    </div>

    <!-- errors -->
    <div v-if=response class="text-red"><p>{{response}}</p></div>

    <div class="input-group">
      <span class="input-group-addon"><i class="fa fa-certificate"></i></span>
      <input readonly class="form-control" name="seed" placeholder="Base Seed" type="text" v-model="newSeed">
    </div>

    <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Submit</button>
  </form>
  <form v-else class="ui form loginForm" @submit.prevent="postWallet">

    <label>Account address</label>
    <div class="input-group">
      <span class="input-group-addon"><i class="fa fa-lock"></i></span>
      <input class="form-control" name="address" placeholder="Seed" v-model="base58.AccountAddress">
    </div>

    <label>Public key</label>
    <div class="input-group">
      <span class="input-group-addon"><i class="fa fa-lock"></i></span>
      <input class="form-control" name="publickey" v-model="base58.AccountPublicKey">
    </div>

    <label>Private key</label>
    <div class="input-group">
      <span class="input-group-addon"><i class="fa fa-lock"></i></span>
      <input readonly class="form-control" name="privatekey" v-model="base58.AccountPrivateKey">
    </div>

    <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Submit</button>
  </form>
</template>

<script>
import axios from 'axios'
import api from '../../api'
// var SHA256 = require('../../libs/sha256.js')
// import SHA256 from '../../libs/sha256.js'
// import Base58 from '../../libs/Base58.js'
// require('../../libs/Base58.js')
// import qora from '../../libs/qora.js'
// require('../../libs/qora.js')

import crypto from '../../crypto/index.js'

export default {
  name: 'New',
  data (router) {
    return {
      section: 'New',
      loading: '',
      seed: '',
      password: '',
      accountSeed: '',
      keyPair: '',
      base58: {
        addressSeed: '',
        AccountSeed: '',
        AccountPublicKey: '',
        AccountPrivateKey: '',
        AccountAddress: ''
      },
      response: ''
    }
  },
  methods: {
    postWallet () {
      console.log(this.base58.addressSeed)
      // crypto.accountFromSeed(this.base58.addressSeed)
      crypto.accountFromSeed('CJWDvjD4Z1VdyArmK8a1ivRWqcrQP6njtza2dmZPaQFF')
      console.log(this.base58.AccountAddress)
      // axios.post(this.$store.state.serverURI + 'wallet', {
      axios.post(this.$store.state.serverURI + 'wallet/unlock', {
        seed: this.base58.AccountSeed,
        password: this.password
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    createSeed () {
      let seed58 = this.newSeed
      if (!seed58) {
        this.response = 'invalid seed!'
        this.toggleLoading()
        console.log(this.response)
        return
      }

      crypto.createAddressSeed(this, seed58)

      console.log(this.base58.AccountSeed)
      console.log(this.base58.AccountAddress)
    },
    /*
    doAccountFromSeed (base58AccountSeed) {
      if (base58AccountSeed) {
        this.base58.AccountSeed = base58AccountSeed
      } else {
        base58AccountSeed = this.base58.AccountSeed
      }

      if (Base58.decode(base58AccountSeed).length !== 32) {
        this.base58.AccountPublicKey = ''
        this.base58.AccountPrivateKey = ''
        this.base58.AccountAddress = ''
        this.response = 'invalid seed!'
        return
      }

      this.keyPair = qora.getKeyPairFromSeed(base58AccountSeed, false)
      this.base58.AccountAddress = qora.getAccountAddressFromPublicKey(this.keyPair.publicKey)

      this.base58.AccountPublicKey = Base58.encode(this.keyPair.publicKey)
      this.base58.AccountPrivateKey = Base58.encode(this.keyPair.privateKey)
    },
    */
    checkCreds () {
      const {seed, password} = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */
      api.request('post', '/login', {seed, password})
      .then(response => {
        this.toggleLoading()

        var data = response.data
        /* Checking if error object was returned from the server */
        if (data.error) {
          var errorName = data.error.name
          if (errorName) {
            this.response = errorName === 'InvalidCredentialsError'
            ? 'Seed/Password incorrect. Please try again.'
            : errorName
          } else {
            this.response = data.error
          }

          return
        }

        /* Setting user in the state and caching record to the localStorage */
        if (data.user) {
          var token = 'Bearer ' + data.token

          this.$store.commit('SET_USER', data.user)
          this.$store.commit('SET_TOKEN', token)

          if (window.localStorage) {
            window.localStorage.setItem('seed', JSON.stringify(data.user))
            window.localStorage.setItem('token', token)
          }

          this.$router.push(data.redirect)
        }
      })
      .catch(error => {
        this.$store.commit('TOGGLE_LOADING')
        console.log(error)

        this.response = 'Server appears to be offline'
        this.toggleLoading()
      })
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  },
  computed: {
    newSeed: function () {
      const {password} = this

      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      if (password.length < 8) {
        this.response = 'invalid passphrase length!\nIt should be at least 8 characters.'
        this.toggleLoading()
        return
      }
      // let byteSeed = new Uint8Array(SHA256.digest(SHA256.digest(password)))
      // let base58BaseSeed = Base58.encode(byteSeed)

      this.seed = crypto.generateSeed(password)

      return this.seed
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  /*background-color: #282B30 !important;*/
  background-color: white;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>

<template>
  <div>
    <transition 
      name="custom-classes-transition"
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
      mode="out-in"
    >
      <form v-if="!validateSeed" class="ui form loginForm"  @submit.prevent="checkSeed" key="seed_validate">

        <!-- <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-lock"></i></span>
          <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
        </div> -->

        <h4 class="animated infinite bounce">Remember your seed! </h4>
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-certificate"></i></span>
          <input readonly class="form-control" name="seed" placeholder="Base 58 Seed" type="text" v-model="seed">
        </div>

        <button type="submit" v-bind:class="'btn btn-primary btn-lg hvr-icon-forward fade-hover ' + loading">Next 
          <!-- <i class="fa fa-arrow-right" aria-hidden="true"></i> -->
        </button>
      </form>
      <form v-else class="ui form loginForm" @submit.prevent="createWallet" key="seed_submit">

        <div class="input-group" v-bind:class="{ 'has-error': repeatseed !== seed}">
          <span class="input-group-addon"><i class="fa fa-certificate"></i></span>
          <input class="form-control" name="seed" placeholder="Repeat your seed" type="text" v-model="repeatseed">
        </div>

        <div class="input-group" v-bind:class="{ 'has-error': password < 8}">
          <span class="input-group-addon"><i class="fa fa-lock"></i></span>
          <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
        </div>

        <div class="input-group" v-bind:class="{ 'has-error': repeatpassword !== password}">
          <span class="input-group-addon"><i class="fa fa-lock"></i></span>
          <input class="form-control" name="password" placeholder="Repeat your password" type="password" v-model="repeatpassword">
        </div>

        <!-- <label>Account address</label>
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
        </div> -->
        <div class="row">
          <div class="col-md-6">
            <a v-bind:class="'btn btn-primary btn-lg fade-hover ' + loading" @click="validateSeed = !validateSeed">
              <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
            </a>
          </div>
          <div class="col-md-6">
            <button type="submit" v-bind:class="'btn btn-primary btn-lg fade-hover ' + loading">Submit!</button>
          </div>
        </div>
      </form>
    </transition>
    <!-- errors -->
    <div v-if=response class="text-red"><p>{{response}}</p></div>
  </div>
</template>

<script>
import axios from 'axios'
// import api from '../../api'
// var SHA256 = require('../../libs/sha256.js')
// import SHA256 from '../../libs/sha256.js'
// import Base58 from '../../libs/Base58.js'
// require('../../libs/Base58.js')
// import qora from '../../libs/qora.js'
// require('../../libs/qora.js')

// import crypto from '../../crypto/index.js'
import auth from '../../auth'

const serverURI = 'http://localhost:8080/api/'

export default {
  name: 'New',
  data (router) {
    /*
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
    */
    return {
      section: 'New',
      loading: '',
      seed: '',
      validateSeed: '',
      repeatseed: '',
      password: '',
      repeatpassword: '',
      keys: '',
      response: ''
    }
  },
  created () {
    this.toggleLoading()
    this.generate58Seed()
  },
  methods: {
    createWallet () {
      this.toggleLoading()
      if (this.validateWallet()) {
        auth.signup(this.seed, this.password)
        this.$router.push('/')
      }
      // this.response = 'ivalid wallet!'
      return
    },
    generate58Seed () {
      axios.get(serverURI + 'seed')
        .then((response) => {
          var seed = response.data.seed
          // console.log(seed)
          this.seed = seed
        })
      .catch(function (error) {
        console.log(error)
      })
    },
    checkSeed () {
      this.toggleLoading()
      let seed58 = this.seed
      if (!seed58) {
        this.response = 'invalid seed!'
        this.toggleLoading()
        console.log(this.response)
        return
      }

      this.validateSeed = true
      // console.log(crypto.createAddressSeed(seed58))
      // this.keys = crypto.generateKeys(seed58)
    },
    validateWallet () {
      this.resetResponse()
      if (this.seed !== this.repeatseed) {
        this.response = 'invalid seed!'
        return false
      }
      if (this.password !== this.repeatpassword) {
        this.response = 'invalid password!'
        return false
      }
      return true
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
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  }

  /*
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
      this.seed = crypto.generateSeed(password)

      return this.seed
    }
  }
  */
}
</script>

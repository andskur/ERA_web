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
        <div class="input-group input-large">
          <span class="input-group-addon"><i class="fa fa-certificate"></i></span>
          <input readonly class="form-control" name="seed" placeholder="Base 58 Seed" type="text" v-model="seed">
        </div>
        <a v-bind:class="'btn btn-primary btn-lg fade-hover ' + loading" @click="generate58Seed">New Seed</a>
        <button type="submit" v-bind:class="'btn btn-primary btn-lg hvr-icon-forward fade-hover ' + loading">Next 
          <!-- <i class="fa fa-arrow-right" aria-hidden="true"></i> -->
        </button>
      </form>
      <form v-else class="ui form loginForm" @submit.prevent="createWallet" key="seed_submit">

        <div class="input-group input-large" v-bind:class="{ 'has-error': repeatseed !== seed}">
          <span class="input-group-addon"><i class="fa fa-certificate"></i></span>
          <input class="form-control" name="seed" placeholder="Repeat your seed" type="text" v-model="repeatseed">
        </div>

        <div class="input-group input-large" v-bind:class="{ 'has-error': password < 8}">
          <span class="input-group-addon"><i class="fa fa-lock"></i></span>
          <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
        </div>

        <div class="input-group input-large" v-bind:class="{ 'has-error': repeatpassword !== password}">
          <span class="input-group-addon"><i class="fa fa-lock"></i></span>
          <input class="form-control" name="password" placeholder="Repeat your password" type="password" v-model="repeatpassword">
        </div>
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
import crypto from '../../crypto/index.js'
import auth from '../../auth'
// import nacl from 'tweetnacl'
import randomWords from 'random-words'
import bs58 from 'bs58'
// import ERA from 'era-javascript-api'

// const serverURI = 'http://localhost:8080/api/'

export default {
  name: 'New',
  data (router) {
    return {
      loading: '',
      seed: '',
      validateSeed: '',
      repeatseed: '',
      password: '232232',
      repeatpassword: '232232',
      response: ''
    }
  },
  created () {
    this.generate58Seed()
  },
  methods: {
    createWallet () {
      this.resetResponse()
      this.toggleLoading()
      if (this.validateWallet()) {
        // Create and add wallet to wallets store
        var wallets = this.$store.state.wallets
        var wallet = auth.createWallet(this.seed, this.password, wallets.length)
        this.$store.commit('ADD_WALLET', wallet)
        window.localStorage.setItem('wallets', JSON.stringify(wallets))
        this.$store.commit('SET_activeWallet', wallet)
        window.localStorage.setItem('activeWallet', JSON.stringify(wallet))
        console.log(this.$store.state.activeWallet)
        this.$router.push('/')
      } else {
        this.response = 'ivalid wallet!'
        return
      }
    },
    generate58Seed () {
      this.resetResponse()
      this.toggleLoading()
      /*
      axios.get(serverURI + 'seed')
        .then((response) => {
          var seedApi = response.data.seed
          console.log('Seed from api lenght: ' + seedApi.length + ' - ' + seedApi)
          // console.log('Length: ' + seedApi.length)
          // this.seed = seed
        })
      .catch(function (error) {
        console.log(error)
      })
      */
      var passphrase = randomWords({ exactly: 12, join: ' ' })
      // console.log(passphrase)
      var seed = crypto.generateSeed(passphrase)
      // console.log('Seed from lib lenght: ' + seed.length + ' - ' + seed)
      // console.log('Length: ' + seed.length)
      this.seed = seed
      this.repeatseed = seed
    },
    checkSeed () {
      this.resetResponse()
      this.toggleLoading()
      let seed58 = this.seed
      let byteseeed = bs58.decode(seed58)
      if (!seed58 || byteseeed.length !== 32) {
        this.response = 'invalid seed!'
        this.toggleLoading()
        console.log(this.response)
        this.validateSeed = false
        return
      }

      this.validateSeed = true
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

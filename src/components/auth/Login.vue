<template>
  <!-- login form -->
  <div>
    <!-- <button v-on:click="testAuth">check</button> -->
    <!-- <form class="ui form loginForm"  @submit.prevent="loginWallet"> -->
    <div class="ui form loginForm">
      <!-- <div class="input-group">
        <span class="input-group-addon"><i class="fa fa-certificate"></i></span>
        <input class="form-control" name="seed" placeholder="Seed" type="text" v-model="credentials.seed">
      </div> -->
      <div class="input-group input-large">
        <span class="input-group-addon"><i class="fa fa-certificate"></i></span>
        <select class="form-control" v-model="credentials.seed">
          <option v-for="wallet in wallets" v-bind:value="wallet.id">
            {{wallet.seed}}
          </option>
        </select>
      </div>

      <!-- errors -->
      <div v-if=response class="text-red"><p>{{response}}</p></div>
      
      <div class="input-group input-large">
        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
        <input class="form-control" name="password" placeholder="Password" type="password" v-model="credentials.password">
      </div>
      <div>
        <!-- <div class="col-md-5"> -->
          <button v-on:click="loginWallet" v-bind:class="'btn btn-primary btn-block ' + loading">Login</button>
        <!-- </div> -->
        <!-- <div class="col-md-2"> -->
          <span>OR</span>
        <!-- </div> -->
        <!-- <div class="col-md-5"> -->
          <router-link to="/auth/new">
            <button v-bind:class="'btn btn-primary btn-block ' + loading">Create</button>
          </router-link>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import auth from '../../auth'
// import VueAuth from '@websanova/vue-auth'
// import axios from 'axios'
// import {router} from '../../main'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      credentials: {
        seed: '',
        password: ''
      },
      response: ''
    }
  },
  computed: {
    wallets () {
      return this.$store.state.wallets
    }
  },
  methods: {
    testAuth () {
      auth.checkAuth()
    },
    loginWallet () {
      var credentials = {
        seed: this.credentials.seed,
        password: this.credentials.password
      }

      auth.login(this, credentials)

      this.$router.push('/')
    },
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
  }
}
</script>
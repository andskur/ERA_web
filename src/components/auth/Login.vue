<template>
  <!-- login form -->
  <div>
    <!-- <button v-on:click="testAuth">check</button> -->
    <!-- <form class="ui form loginForm"  @submit.prevent="loginWallet"> -->
    <div class="ui form loginForm">
      <div class="input-group">
        <span class="input-group-addon"><i class="fa fa-certificate"></i></span>
        <input class="form-control" name="seed" placeholder="Seed" type="text" v-model="credentials.seed">
      </div>

      <!-- errors -->
      <div v-if=response class="text-red"><p>{{response}}</p></div>
      
      <div class="input-group">
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
      /*
      this.$auth.login({
        // url: '/api/wallet/unlock',
        // redirect: '/',
        headers: {
          seed: this.seed,
          password: this.password
        },
        rememberMe: true,
        redirect: '/',
        fetchUser: false,
        success: function (res) {
          console.log('success ' + this.context)
          window.localStorage.setItem('auth-token', res.token)
          // console.log(this.localStorage.getItem('auth-token'))
          // console.log(res)
          // console.log(this.options.http._getHeaders)
        },
        error: function (res) {
          console.log('error ' + this.context)
          this.response = res.data
        }
      })
      */
      // console.log(this.$auth.user())
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
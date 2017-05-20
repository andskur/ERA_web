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
      <div class="input-group input-large" v-bind:class="{ 'has-error': response.target === 'seed'}">
        <span class="input-group-addon"><i class="fa fa-certificate"></i></span>
        <select required class="form-control" v-model="credentials.seed">
          <option disabled value="">Select your wallet</option>
          <option v-for="wallet in wallets" v-bind:value="wallet.seed">
            {{wallet.seed}}
          </option>
        </select>
      </div>
      
      <div class="input-group input-large" v-bind:class="{ 'has-error': response.target === 'password'}">
        <span class="input-group-addon"><i class="fa fa-lock"></i></span>
        <input required class="form-control" name="password" placeholder="Password" type="password" v-model="credentials.password">
      </div>

      <!-- errors -->
      <div v-if=response class="text-red"><p>{{response.data}}</p></div>

      <div>
        <!-- <div class="col-md-5"> -->
          <button v-on:click="loginWallet" v-bind:class="'btn btn-primary btn-block fade-hover ' + loading">Login</button>
        <!-- </div> -->
        <!-- <div class="col-md-2"> -->
          <span>OR</span>
        <!-- </div> -->
        <!-- <div class="col-md-5"> -->
          <router-link to="/auth/new">
            <button v-bind:class="'btn btn-primary btn-block fade-hover ' + loading">Create</button>
          </router-link>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../../auth'
// import passwords from '../../auth/passwords'

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
      response: {
        target: '',
        data: ''
      }
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
      this.toggleLoading()
      this.resetResponse()

      // passwords.crypt(this.password, function (hash) {
      //   console.log(hash)
      // })

      if (this.validForm()) {
        var credentials = {
          seed: this.credentials.seed,
          password: this.credentials.password
        }

        auth.login(this, credentials)
        this.$router.push('/')
      }
    },
    validForm () {
      if (!this.credentials.seed) {
        this.response.target = 'seed'
        this.response.data = 'Select seed'
        return false
      }
      if (!this.credentials.password) {
        this.response.target = 'password'
        this.response.data = 'Password is required'
        return false
      }
      return true
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response.target = ''
      this.response.data = ''
    }
  }
}
</script>
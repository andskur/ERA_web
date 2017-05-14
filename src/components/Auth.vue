<template>
  <div class="container container-table">
      <div class="row vertical-3p">
        <div class="container">
          <!-- <router-link to="/"> -->
            <img src="/static/img/logo.png" class="center-block logo">
          <!-- </router-link> -->
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- auth form -->
            <router-view></router-view>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      seed: '',
      password: '',
      response: ''
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #282B30 !important;
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
.vertical-3p {
  padding-top: 3%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input, .input-group select {
  height: 4em;
}
.fade-hover {
  transition: all 0.3s ease 0s;
}
.fade-hover:hover {
  background: #3071A9
}
</style>

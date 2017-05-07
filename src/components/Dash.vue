<template>
  <div :class="['wrapper', classes]">
    <header class="main-header">
      <a href="/" class="logo">
        <!-- mini logo for sidebar mini 40x50 pixels -->
        <span class="logo-mini"><img src="/static/img/logo.png" alt="Logo" class="img-responsive center-block"></span>
        <!-- logo for regular state and mobile devices -->
        <div class="logo-lg">
          <img src="/static/img/logo.png" alt="Logo" class="img-responsive">
          <span>ERA</span>
        </div>
      </a>

      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Messages-->
            <li class="dropdown messages-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-envelope-o"></i>
                <span class="label label-success">{{ userInfo.messages | count }}</span>
              </a>
              <ul class="dropdown-menu shadow-3">
                <li class="header">You have {{ userInfo.messages | count }} message(s)</li>
                <li v-if="userInfo.messages.length > 0">
                  <!-- inner menu: contains the messages -->
                  <ul class="menu">
                    <li><!-- start message -->
                      <a href="javascript:;">
                        <!-- Message title and timestamp -->
                        <h4>
                          Vasya Vasya
                          <small><i class="fa fa-clock-o"></i> 5 mins</small>
                        </h4>
                        <!-- The message -->
                        <p>Hello World!</p>
                      </a>
                    </li>
                    <!-- end message -->
                  </ul>
                  <!-- /.menu -->
                </li>
                <li class="footer" v-if="userInfo.messages.length > 0">
                  <router-link to="/mails">
                    <a>See All Messages</a>
                  </router-link>
                </li>
              </ul>
            </li>
            <!-- /.messages-menu -->

            <!-- Notifications Menu -->
            <li class="dropdown notifications-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-bell-o"></i>
                <span class="label label-warning">{{ userInfo.notifications | count }}</span>
              </a>
              <ul class="dropdown-menu shadow-3">
                <li class="header">You have {{ userInfo.notifications | count }} notification(s)</li>
                <li v-if="userInfo.notifications.length > 0">
                  <!-- Inner Menu: contains the notifications -->
                  <ul class="menu">
                    <li><!-- start notification -->
                      <a href="javascript:;">
                        <i class="fa fa-users text-aqua"></i> 5 new members joined today
                      </a>
                    </li>
                    <!-- end notification -->
                  </ul>
                </li>
                <li class="footer" v-if="userInfo.notifications.length > 0"><a href="javascript:;">View all</a></li>
              </ul>
            </li>

            <!-- Tasks Menu -->
            <!-- <li class="dropdown tasks-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-flag-o"></i>
                <span class="label label-danger">{{ userInfo.tasks | count }} </span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have {{ userInfo.tasks | count }}  task(s)</li>
                <li v-if="userInfo.tasks.length > 0">
                  <ul class="menu">
                      <a href="javascript:;">
                        <h3>
                          Design some buttons
                          <small class="pull-right">20%</small>
                        </h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-aqua"
                            style="width: 20%"
                            role="progressbar"
                            aria-valuenow="20"
                            aria-valuemin="0"
                            aria-valuemax="100">
                            <span class="sr-only">20% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="footer" v-if="userInfo.tasks.length > 0">
                  <a href="javascript:;">View all tasks</a>
                </li>
              </ul>
            </li> -->

            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <img v-bind:src="demo.avatar" class="user-image" alt="User Image">
                <span class="hidden-xs">{{ demo.displayName }}</span>
              </a>
              <ul class="dropdown-menu shadow-3">
                <!-- User image -->
                <li class="user-header">
                  <img v-bind:src="demo.avatar" class="img-circle" alt="User Image">
                  <p>{{ demo.displayName }}</p>
                </li>
                <li class="user-footer">
                  <div class="pull-left">
                    <a @click="checkWallet" href="javascript:;" class="btn btn-default btn-flat">
                      <i class="fa fa-user" aria-hidden="true"></i> Profile
                    </a>
                  </div>
                  <div class="pull-right">
                    <a @click="logout" href="javascript:;" class="btn btn-default btn-flat">
                      <i class="fa fa-sign-out" aria-hidden="true"></i>Sign out
                    </a>
                  </div>
                </li>
              </ul>
              <!-- <a @click="logout" href="javascript:;"><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</a> -->
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <sidebar :display-name="demo.displayName"
             :picture-url="demo.avatar" />

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1 v-if="$route.name === 'Inbox' || $route.name === 'New Mail'">
          Mailbox
        </h1>
        <h1 v-else >
          {{$route.name.toUpperCase() }}
          <small>{{ $route.meta.description }}</small>
        </h1>
        <ol class="breadcrumb">
          <li>
            <!-- <router-link to="/"> -->
              <a href="javascript:;"><i class="fa fa-home"></i>Home</a>
            <!-- </router-link> -->
          </li>
          <li class="active">{{$route.name}}</li>
        </ol>
      </section>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; {{year}} <a href="https://aronicle.ru/">Aronicle</a>.</strong> All rights reserved.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
import faker from 'faker'
import { mapState } from 'vuex'
import config from '../config'
import Sidebar from './Sidebar'
import axios from 'axios'
import auth from '../auth'
import 'hideseek'

export default {
  name: 'Dash',
  components: {
    Sidebar
  },
  data: function () {
    return {
      // section: 'Dash',
      year: new Date().getFullYear(),
      classes: {
        fixed_layout: config.fixedLayout,
        hide_logo: config.hideLogoOnMobile
      },
      error: ''
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
    demo () {
      return {
        displayName: faker.name.findName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        randomCard: faker.helpers.createCard()
      }
    }
  },
  methods: {
    checkWallet () {
      var apiUrl = this.$store.state.serverURI
      axios.post(apiUrl + 'wallet/unlock', {
        password: 'passw'
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
        return
      })
    },
    logout () {
      auth.logout()
      this.$router.push('/auth')
    },
    changeloading () {
      this.$store.commit('TOGGLE_SEARCHING')
    }
  }
}
</script>

<style lang="scss">
.wrapper.fixed_layout {
  .main-header {
    position: fixed;
    width: 100%;
  }

  .content-wrapper {
    padding-top: 50px;
  }

  .main-sidebar {
    position: fixed;
    height: 100vh;
  }
}

.wrapper.hide_logo {
  @media (max-width: 767px) {
    .main-header .logo {
      display: none;
    }
  }
}

.logo-mini, .logo-lg {
  text-align: left;

  img {
    padding: .4em;
  }
}

.logo-lg {
  img {
    display: -webkit-inline-box;
    width: 25%;
  }
}
.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}

.shadow-3 {
  box-shadow: 0 0 5px black;
}
</style>

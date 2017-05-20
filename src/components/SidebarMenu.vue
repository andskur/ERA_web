<template>
  <ul class="sidebar-menu">
    <!-- <li class="header">TOOLS</li> -->
    <li class="active pageLink" v-on:click="toggleMenu">
      <router-link to="/"><i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/blocks"><i class="fa fa-table"></i>
        <span class="page">Blocks Explorer</span>
      </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/transactions"><i class="fa fa-random"></i>
        <span class="page">Transactions</span>
      </router-link>
    </li>
    <!-- <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/peers"><i class="fa fa-tasks"></i>
        <span class="page">Peers</span>
      </router-link>
    </li> -->
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span>Assets</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <router-link to="/assets/my">
            <i class="fa fa-file-word-o"></i> My Assets
          </router-link>
        </li>
        <li>
          <router-link to="/assets/all">
            <i class="fa fa-file-picture-o"></i> Search Asset
          </router-link>
        </li>
      </ul>
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-envelope"></i>
        <span>Mails</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <router-link to="/mails">
            <i class="fa fa-inbox"></i> Inbox
          </router-link>
        </li>
        <li>
          <router-link to="/mails/new">
            <i class="fa fa-paper-plane-o"></i> New mail
          </router-link>
        </li>
      </ul>
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-users"></i>
        <span>Persons</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <router-link to="/persons">
            <i class="fa fa-search"></i> Search person
          </router-link>
        </li>
        <li>
          <router-link to="/persons/new">
            <i class="fa fa-user-plus"></i> Add person
          </router-link>
        </li>
      </ul>
    </li>
    <!-- <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/repos"><i class="fa fa-heart"></i>
        <span class="page">Repos</span>
      </router-link>
    </li> -->
    <!-- <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/mails">
        <i class="fa fa-tasks"></i>
        <span class="page">Mails</span>
      </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/setting">
        <i class="fa fa-cog"></i>
        <span class="page">Settings</span>
      </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/access"><i class="fa fa-book"></i>
        <span class="page">Access</span>
      </router-link>
    </li>
    <li class="pageLink" v-on:click="toggleMenu">
      <router-link to="/server"><i class="fa fa-hdd-o"></i>
        <span class="page">Server</span>
      </router-link>
    </li> -->
  </ul>
</template>
<script>
export default {
  name: 'SidebarName',
  methods: {
    toggleMenu (event) {
      // remove active from li
      var active = document.querySelector('li.pageLink.active')

      if (active) {
        active.classList.remove('active')
      }
      // window.$('li.pageLink.active').removeClass('active')
      // Add it to the item that was clicked
      event.toElement.parentElement.className = 'pageLink active'
    }
  }
}
</script>
<style>
  /* override default */
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active>a>.fa-angle-left, .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left {
    animation-name: rotate;
    animation-duration: .2s;
    animation-fill-mode: forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-90deg);
    }
  }
</style>
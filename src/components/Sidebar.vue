<template>
  <aside class="main-sidebar">
  <div class="slimScrollDiv">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->
      <div class="user-panel">
        <div v-if="person" class="pull-left image">
          <img :src="pictureUrl" />
        </div>
        <div class="pull-left info">
          <div>
            <p v-if="person" class="white">{{ displayName }}</p>
            <p v-else class="white">Anonim</p>
          </div>
          <a href="javascript:;">
            <i class="fa fa-circle text-success"></i> Connected
          </a>
        </div>
      </div>
      <br>
      <!-- search form (Optional) -->
      <!-- <form v-on:submit.prevent class="sidebar-form">
        <div class="input-group">
          <input type="text"
            name="search"
            id="search"
            class="search form-control"
            data-toggle="hideseek" p
            laceholder="Search Menus"
            data-list=".sidebar-menu">
          <span class="input-group-btn">
            <button type="submit" name="search" id="search-btn" class="btn btn-flat">
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form> -->
      <!-- /.search form -->

      <!-- Sidebar Menu -->
      <sidebar-menu />
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
    </div>
  </aside>
</template>
<script>
import SidebarMenu from './SidebarMenu'
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',
  props: ['displayName', 'pictureUrl'],
  components: { SidebarMenu },
  computed: {
    ...mapState([
      'person'
    ])
  }
}
</script>
<style>
  .user-panel .image img {
    border-radius: 50%;
  }
</style>

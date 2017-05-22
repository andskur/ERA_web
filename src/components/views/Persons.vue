<template>
  <section class="content">
    <router-view></router-view>    
  </section>
</template>
<script>
export default {
  name: 'Persons',
  data: function () {
    return {
      error: ''
    }
  }
}
</script>

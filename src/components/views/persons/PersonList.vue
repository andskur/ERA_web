<template>
  <div>
    <section class="content">
      <div class="row">
        <div v-if="error">
          Found an error
        </div>
        <div v-else>
          <div class="col-md-4" v-for="person in persons" >
            <div class="box box-widget widget-user">
              <div class="widget-user-header bg-aqua-active text-center">
                <h3 class="widget-user-username center-text">{{person.name }}</h3>
              </div>
              <div class="widget-user-image">
                <img class="img-circle" v-bind:src="person.avatar" alt="repo.owner.login + ' Avatar'">
              </div>
              <div class="box-footer">
                <p>{{person.address}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import faker from 'faker'

export default {
  name: 'PersonList',
  data () {
    return {
      persons: null,
      error: null
    }
  },
  created () {
    var persons = []
    for (var i = 0; i < 18; i++) {
      var person = {
        id: i,
        avatar: faker.image.avatar(),
        name: faker.fake('{{name.firstName}} {{name.lastName}}'),
        address: faker.fake('{{finance.bitcoinAddress}}')
      }
      persons.push(person)
    }
    this.persons = persons
  }
}
</script>

<style>
  .box-footer > p {
    text-align: center;
  }
</style>

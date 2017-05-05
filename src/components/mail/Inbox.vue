<template>
  <div class="box-body no-padding">
    <div class="mailbox-controls">
      <!-- Check all button -->
      <label class="btn btn-default btn-sm checkbox-toggle">
        <input type="checkbox" v-model="selectAll">
      </label>
      <div class="btn-group">
        <button type="button" class="btn btn-default btn-sm"><i class="fa fa-trash-o"></i></button>
        <button type="button" class="btn btn-default btn-sm"><i class="fa fa-reply"></i></button>
        <button type="button" class="btn btn-default btn-sm"><i class="fa fa-share"></i></button>
      </div>
      <!-- /.btn-group -->
      <button type="button" class="btn btn-default btn-sm"><i class="fa fa-refresh"></i></button>
      <div class="pull-right">
        1-50/200
        <div class="btn-group">
          <button type="button" class="btn btn-default btn-sm"><i class="fa fa-chevron-left"></i></button>
          <button type="button" class="btn btn-default btn-sm"><i class="fa fa-chevron-right"></i></button>
        </div>
        <!-- /.btn-group -->
      </div>
      <!-- /.pull-right -->
    </div>
    <div class="table-responsive mailbox-messages">
      <table class="table table-hover table-striped">
        <tbody>
          <tr v-for="message in messages">
            <td>
              <input type="checkbox" v-model="selected" :value="message.id" number>
            </td>
            <td class="mailbox-star"><a href="#"><i class="fa fa-star-o text-yellow"></i></a></td>
            <td class="mailbox-name"><a href="read-mail.html">{{message.name}}</a></td>
            <td class="mailbox-subject">
              <b>{{message.subject}}</b> - {{message.message.substr(0, 40) + '...'}}
            </td>
            <td class="mailbox-attachment"><i v-if="message.attachment === 'true'" class="fa fa-paperclip"></i></td>
            <td class="mailbox-date">5 mins ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import faker from 'faker'
  import $ from 'jquery'

  export default {
    name: 'Inbox',
    data: function () {
      return {
        messages: '',
        selected: [],
        error: ''
      }
    },
    created () {
      var messages = []
      for (var i = 0; i < 20; i++) {
        var msg = {
          id: i,
          name: faker.fake('{{name.firstName}} {{name.lastName}}'),
          subject: faker.fake('{{random.words}}'),
          message: faker.fake('{{hacker.phrase}}'),
          attachment: faker.fake('{{random.boolean}}')
        }
        messages.push(msg)
      }
      this.messages = messages
    },
    computed: {
      selectAll: {
        get: function () {
          return this.messages ? this.selected.length === this.messages.length : false
        },
        set: function (value) {
          var selected = []

          if (value) {
            this.messages.forEach(function (message) {
              selected.push(message.id)
            })
          }

          this.selected = selected
        }
      }
    },
    mounted: function () {
      this.$nextTick(() => {
      // Handle starring for glyphicon and font awesome
        $('.mailbox-star').click(function (e) {
          e.preventDefault()
          // detect type
          var $this = $(this).find('a > i')
          var glyph = $this.hasClass('glyphicon')
          var fa = $this.hasClass('fa')

          // Switch states
          if (glyph) {
            $this.toggleClass('glyphicon-star')
            $this.toggleClass('glyphicon-star-empty')
          }

          if (fa) {
            $this.toggleClass('fa-star')
            $this.toggleClass('fa-star-o')
          }
        })
      })
    }
  }
</script>
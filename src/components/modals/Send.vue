<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" @click="$emit('close')" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">Send Transaction</h4>
            </div>
            <div class="modal-body">
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-fw fa-user" aria-hidden="true"></i>
                </span>
                <input class="form-control" name="recipient" v-model="recipient" placeholder="Recipient" type="text" required>
              </div>
              <br />
              <div class="input-group">
                <span class="input-group-addon">
                  <i class="fa fa-fw fa-usd" aria-hidden="true"></i>
                </span>
                <input class="form-control" name="amount" v-model="amount" type="number" step="0.0001" placeholder="0,0001" min="0.0001" required>
                <!-- <span class="input-group-addon">.00</span> -->
              </div>
              <br />
              <div class="form-group">
                <textarea class="form-control" name="message" v-model="message" placeholder="message..."></textarea>
                <!-- <span class="input-group-addon">.00</span> -->
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="$emit('close')">Cancel</button>
              <button type="button" class="btn btn-primary" @click="sendTransaction()">Send transaction <i class="fa fa-paper-plane-o"></i></button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div>
    </div>
  </transition>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'SendModale',
    data: function () {
      return {
        recipient: '',
        amount: '',
        message: ''
      }
    },
    methods: {
      sendTransaction () {
        const API_URL = 'http://datachains.world:9067/lightwallet/'
        // let publickey = window.localStorage.getItem('publickey')
        let publickey = '5mgpEGqUGpfme4W2tHJmG7Ew21Te2zNY7Ju3e9JfUmRF'
        // let privatekey = console.log(window.localStorage.getItem('privatekey'))
        axios.get(API_URL + 'getraw/31/' + publickey, {
          params: {
            feePow: 2,
            recipient: this.recipient,
            amount: this.amount,
            key: 1
          }
        })
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log('error', error.response)
          })
      }
    }
  }
</script>
<style>
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

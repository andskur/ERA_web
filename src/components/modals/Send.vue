<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" @click="$emit('close')" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">Send Transaction</h4>
              <h5 v-if="response.status">Status: <span class="text-success">{{response.status}}</span></h5>
            </div>
            <div v-if="!response.data" class="modal-body">
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
              <h5 v-if="error">Error: <span class="text-danger">{{error}}</span></h5>
            </div>
            <div v-else class="modal-body">{{response.data}}</div>
            <div v-if="!response.data" class="modal-footer">
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
  import bs58 from 'bs58'
  import nacl from 'tweetnacl'

  export default {
    name: 'SendModale',
    data: function () {
      return {
        recipient: '77QnJnSbS9EeGBa2LPZFZKVwjPwzeAxjmy',
        amount: 0.0001,
        message: '',
        response: {
          status: '',
          data: ''
        },
        error: ''
      }
    },
    methods: {
      sendTransaction () {
        const API_URL = 'http://localhost:8080/lightwallet/'
        // const API_URL = 'http://185.146.168.226:9067/lightwallet/'
        // let publickey = window.localStorage.getItem('publickey')
        let publickey = this.$store.state.activeWallet.keys.public
        // let publickey = '5mgpEGqUGpfme4W2tHJmG7Ew21Te2zNY7Ju3e9JfUmRF'
        // let privatekey = window.localStorage.getItem('privatekey')
        let privatekey = this.$store.state.activeWallet.keys.private

        axios({
          method: 'GET',
          url: API_URL + 'getraw/31/' + publickey,
          crossDomain: true,
          headers: {'Access-Control-Allow-Origin': '*'},
          params: {
            feePow: 2,
            recipient: this.recipient,
            amount: this.amount,
            message: this.message,
            key: 1
          }
        })
          .then(response => {
            // console.log(response.statusText)
            // console.log(response.data)
            // console.log(response.status)
            // console.log(response.headers)
            // console.log(response.config)
            var byteMessage = bs58.decode(response.data)
            var signature = new Buffer(nacl.sign(byteMessage, bs58.decode(privatekey)))
            var slice1 = byteMessage.slice(0, 53)
            var slice2 = byteMessage.slice(53, byteMessage.length)
            var buffers = [slice1, signature, slice2]
            var messageBuf = Buffer.concat(buffers)
            // console.log(messageBuf)
            var message58 = bs58.encode(messageBuf)
            // console.log(message58)
            var endpoint = 'parse?data=' + message58

            axios.get(API_URL + endpoint)
              .then(response => {
                console.log(response.statusText)
                this.response.status = response.statusText
                console.log(response.data)
                this.response.data = response.data
              })
              .catch(error => {
                if (error.response) {
                  console.log(error.response.data)
                  console.log(error.response.status)
                  console.log(error.response.headers)
                  this.error = error.response.data
                } else if (error.request) {
                  console.log(error.request)
                  this.error = error.request
                } else {
                  console.log('Error', error.message)
                  this.error = error.message
                }
                console.log(error.config)
              })
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
              this.error = error.response.data
            } else if (error.request) {
              console.log(error.request)
              this.error = error.request
            } else {
              console.log('Error', error.message)
              this.error = error.message
            }
            console.log(error.config)
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
textarea {
  max-width: 100%;
}
</style>

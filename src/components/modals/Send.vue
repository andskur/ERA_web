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
  import bs58 from 'bs58'
  import nacl from 'tweetnacl'

  export default {
    name: 'SendModale',
    data: function () {
      return {
        recipient: '77QnJnSbS9EeGBa2LPZFZKVwjPwzeAxjmy',
        amount: 0.0001,
        message: ''
      }
    },
    methods: {
      sendTransaction () {
        const API_URL = 'http://localhost:8080/lightwallet/'
        // const API_URL = 'http://185.146.168.226:9067/lightwallet/'
        // let publickey = window.localStorage.getItem('publickey')
        let publickey = '5mgpEGqUGpfme4W2tHJmG7Ew21Te2zNY7Ju3e9JfUmRF'
        let privatekey = window.localStorage.getItem('privatekey')

        axios({
          method: 'GET',
          url: API_URL + 'getraw/31/' + publickey,
          crossDomain: true,
          headers: {'Access-Control-Allow-Origin': '*'},
          withCredentials: true,
          params: {
            feePow: 2,
            recipient: this.recipient,
            amount: this.amount,
            key: 1
          }
        })
          .then(response => {
            // console.log(response.statusText)
            console.log(response.data)
            // console.log(response.status)
            // console.log(response.headers)
            // console.log(response.config)
            var byteMessage = bs58.decode(response.data)
            var signature = nacl.sign(byteMessage, bs58.decode(privatekey))
            var slice1 = byteMessage.slice(0, 53)
            var slice2 = byteMessage.slice(53, byteMessage.length)
            var buffers = [slice1, signature, slice2]
            // console.log(buffers)
            var totalLength2 = slice1.length + signature.length + slice2.length
            // console.log(totalLength2)
            var messageBuf = Buffer.concat(buffers, totalLength2)
            console.log(messageBuf)
            var endpoint = 'parse?data=' + bs58.encode(messageBuf)
            console.log(endpoint)
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
            } else if (error.request) {
              console.log(error.request)
            } else {
              console.log('Error', error.message)
            }
            console.log(error.config)
          })
        /*
        axios.get(API_URL + 'getraw/31/' + publickey, {
          params: {
            feePow: 2,
            recipient: this.recipient,
            amount: this.amount,
            key: 1
          }
        })
          .then(response => {
            const buf1 = [31, 0, 0, 128, 0, 0, 1, 91, 144, 163, 185, 2]
            const buf2 = Buffer.alloc(14)
            const buf3 = Buffer.alloc(18)
            const totalLength = buf1.length + buf2.length + buf3.length

            // Prints: 42
            console.log(totalLength)

            var arraybuf = [buf1, buf2, buf3]
            console.log(arraybuf)

            const bufA = Buffer.concat(arraybuf, totalLength)

            // Prints: <Buffer 00 00 00 00 ...>
            console.log(bufA)

            console.log(response.data)
            var byteMessage = bs58.decode(response.data)
            var signature = nacl.sign(byteMessage, bs58.decode(privatekey))
            var slice1 = byteMessage.slice(0, 53)
            var slice2 = byteMessage.slice(53, byteMessage.length)
            var buffers = [slice1, signature, slice2]
            // console.log(buffers)
            var totalLength2 = slice1.length + signature.length + slice2.length
            // console.log(totalLength2)
            var messageBuf = Buffer.concat(buffers, totalLength2)
            console.log(messageBuf)
            var endpoint = 'parse?data=' + bs58.encode(messageBuf)
            // console.log(endpoint)
            axios.get(API_URL + endpoint, {
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
          })
          .catch(error => {
            console.log('error', error.response)
          })
          */
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
</style>

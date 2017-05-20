<template>
  <div class="box-body">
    <div class="row">
      <div class="col-md-4">
        <label>Add Image</label>
        <div 
          class="image-upload"
          @dragleave="preventDefault"
          @dragover="preventDefault"
        @dragenter="preventDefault"
        @click="handleClick"
        @drop="handleChange"
        >
        <div v-if="!person.image.sourceUrl" class="drop-area">
          <i class="icon1" v-show="loading != 1">
            <i class="icon1-arrow"></i>
            <i class="icon1-body"></i>
            <i class="icon1-bottom"></i>
          </i>

          <!-- <span class="hint" v-show="loading !== 1">15 - 20kb</span> -->
          <span class="hint" v-show="error">{{error}}</span>
          <!-- <span class="vicp-no-supported-hint" v-show="!isSupported">No supported file</span> -->
        </div>
        <div v-else>
          <img class="img-responsive" :src="person.image.sourceUrl" />
          Size: {{person.image.size}} bytes
        </div>
        <input type="file" v-show="false" @change="handleChange" ref="fileinput">
        </div>
      </div>
      <div class="col-md-8">
        <!-- <button type="button" class="btn btn-primary" @click="signPerson()">Write to file <i class="fa fa-file-text"></i></button> -->
        <div class="form-group">
          <label for="name" class="control-label">Name</label>
          <input v-model="person.name" id="name" type="text" class="form-control" placeholder="Yor name" required>
        </div>
        <div class="form-group">
          <label for="description" class="control-label">Description</label>
          <textarea v-model="person.description" id="description" rows="4" class="form-control" placeholder="Some information about you" required></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="birthday" class="control-label">Birthday</label>
          <div class="input-group">
            <span class="input-group-addon">
              <i class="fa fa-fw fa-calendar"></i>
            </span>
            <datepicker v-model="person.birthday" id="birthday" input-class="form-control" placeholder="Your birthday" required></datepicker>
          </div>
        </div>
        <div class="form-group">
          <label for="gender" class="control-label">Gender</label>
          <select id="gender" v-model="person.gender" class="form-control">
            <option>Male</option>
            <option>Female</option>
            <option>...</option>
          </select>
        </div>
        <div class="form-group">
          <label for="skin" class="control-label">Skin color</label>
          <input v-model="person.skin" id="skin" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label for="hair" class="control-label">Hair color</label>
          <input v-model="person.hair" id="hair" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label for="fee" class="control-label">Fee power</label>
          <input v-model="person.fee" id="fee" type="number" min="0" class="form-control">
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="deathday" class="control-label">Deathday</label>
          <div class="input-group">
            <span class="input-group-addon">
              <i class="fa fa-fw fa-calendar"></i>
            </span>
            <datepicker v-model="person.deathday" id="deathday" input-class="form-control" placeholder="Your deathday"></datepicker>
          </div>
        </div>
        <div class="form-group">
          <label for="number" class="control-label">Person number</label>
          <input v-model="person.number" id="number" type="number" min="0" class="form-control" placeholder="Person number">
        </div>
        <div class="form-group">
          <label for="eye" class="control-label">Eye color</label>
          <input v-model="person.eye" id="eye" type="text" class="form-control">
        </div>
        <div class="form-group">
          <label for="height" class="control-label">Height</label>
          <input v-model="person.height" id="height" type="number" min="0" class="form-control">
        </div>
        <div class="form-group">
          <label for="place" class="control-label">Birth place</label>
          <vue-google-autocomplete
          id="place"
          classname="form-control"
          placeholder="Your birt city"
          types="(cities)"
          v-on:placechanged="getAddressData"
          >
        </vue-google-autocomplete>
          {{person.coordinates.latitude}} {{person.coordinates.longitude}}
        </div>
      </div>
    </div>
    <div v-if="!person58">
      <button type="button" class="btn btn-default" @click="$emit('close')">Cancel</button>
      <button type="button" class="btn btn-primary" @click="signPerson()">Sign person <i class="fa fa-lock"></i></button>
    </div>
    <div v-else>
      <button type="button" class="btn btn-default" @click="$emit('close')">Cancel</button>
      <button type="button" class="btn btn-primary" @click="toFile()">Write to file <i class="fa fa-file-text"></i></button>
      <a :href="tomail" class="btn btn-primary" @click="">Send to email <i class="fa fa-paper-plane-o"></i></a>
    </div>
  </div>
</template>
<script>
  import Datepicker from 'vuejs-datepicker'
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import ImageTools from '../../../images'
  import toBytes from '../../../toBytes/'
  import bs58 from 'bs58'
  import nacl from 'tweetnacl'

  export default {
    name: 'PErsonNew',
    components: {
      Datepicker,
      VueGoogleAutocomplete
    },
    data () {
      return {
        person58: '',
        tomail: '',
        person: {
          name: '',
          description: '',
          birthday: '',
          deathday: '',
          gender: '',
          number: '',
          skin: '',
          eye: '',
          hair: '',
          height: '',
          coordinates: {
            latitude: '',
            longitude: ''
          },
          fee: '',
          // address: '',
          image: {
            sourceUrl: '',
            size: ''
          }
        },
        loading: '',
        error: ''
      }
    },
    methods: {
      getAddressData (addressData, placeResultData) {
        // this.person.address = addressData
        this.person.coordinates.latitude = addressData.latitude
        this.person.coordinates.longitude = addressData.longitude
      },
      preventDefault (e) {
        e.preventDefault()
        return false
      },
      handleClick (e) {
        // if (this.loading !== 1) {
        if (e.target !== this.$refs.fileinput) {
          e.preventDefault()
          if (document.activeElement !== this.$refs) {
            this.$refs.fileinput.click()
          }
        }
        // }
      },
      resetImage () {
        this.person.image.sourceUrl = null
        this.error = null
      },
      handleChange (e) {
        // this.toggleLoading()
        this.resetImage()
        e.preventDefault()
        if (this.loading !== 1) {
          let files = e.target.files || e.dataTransfer.files
          let that = this
          // this.reset()
          var file = files[0]
          // if (this.checkFile(files[0])) {
          this.person.image.size = file.size
          console.log(file.size)
          // this.setSourceImg(file)
          ImageTools.resize(file, {
            width: 350, // maximum width
            height: 350 // maximum width
          }, function (blob, didItResize) {
            console.log(didItResize)
            if (didItResize) {
              that.setSourceImg(blob)
            } else {
              that.error = 'So big image'
              return
            }
          })
          // }
        }
      },
      setSourceImg (file) {
        console.log(file.size)
        this.person.image.size = file.size
        if (file.size > 25000) {
          this.error = 'So big image'
          return
        }
        let that = this
        let fr = new window.FileReader()

        fr.onload = function (e) {
          that.person.image.sourceUrl = fr.result
        }
        fr.readAsDataURL(file)
      },
      toFile () {
        console.log(this.person58)
        this.download(this.person.name + '.txt', this.person58)
      },
      download (filename, text) {
        var element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
      },
      signPerson () {
        var person = JSON.stringify(this.person)
        var personBytes = this.toBytes(person)
        this.toggleLoading()
        // console.log(personBytes)
        var byteMessage = new Buffer(personBytes)
        // console.log(byteMessage)
        let privatekey = this.$store.state.activeWallet.keys.private
        var signature = new Buffer(nacl.sign(byteMessage, bs58.decode(privatekey)))
        // console.log(signature)
        var slice1 = byteMessage.slice(0, 53)
        var slice2 = byteMessage.slice(53, byteMessage.length)
        var buffers = [slice1, signature, slice2]
        var messageBuf = Buffer.concat(buffers)
        // console.log(messageBuf)
        var person58 = bs58.encode(messageBuf)
        console.log(person58)
        this.person58 = person58
        this.tomail = 'mailto:?subject=New person - ' + this.person.name + '&body=' + this.person58
      },
      toBytes (person) {
        var personBytes = toBytes.toUTF8Array(person)
        return personBytes
      },
      toggleLoading () {
        this.$store.commit('TOGGLE_LOADING')
      }
      /*
      setSourceImg (file) {
        let that = this
        let fr = new window.FileReader()

        fr.onload = function (e) {
          var img = new window.Image()

          that.image.sourceUrl = fr.result

          // console.log(fr.result)
          console.log(img)
          img.onload = function () {
            console.log(img.src)
          }
          img.src = e.target.result
        }
        fr.readAsDataURL(file)
      }
      */
    }
  }
</script>

<style scoped>
  .modal-dialog {
    width: 750px;
  }
  .modal-content {
    max-height: 500px;
    overflow-y: scroll;
  }
  .image-upload {
    cursor: pointer;
  }
  .drop-area {
      position: relative;
      padding: 55px;
      height: 170px;
      background-color: rgba(0, 0, 0, 0.03);
      text-align: center;
      border: 1px dashed rgba(0, 0, 0, 0.08);
      overflow: hidden; }
      .drop-area .icon1 {
        display: block;
        margin: 0 auto 6px;
        width: 42px;
        height: 42px;
        overflow: hidden; }
        .drop-area .icon1 .icon1-arrow {
          display: block;
          margin: 0 auto;
          width: 0;
          height: 0;
          border-bottom: 14.7px solid rgba(0, 0, 0, 0.3);
          border-left: 14.7px solid transparent;
          border-right: 14.7px solid transparent; }
        .drop-area .icon1 .icon1-body {
          display: block;
          width: 12.6px;
          height: 14.7px;
          margin: 0 auto;
          background-color: rgba(0, 0, 0, 0.3); }
        .drop-area .icon1 .icon1-bottom {
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          display: block;
          height: 12.6px;
          border: 6px solid rgba(0, 0, 0, 0.3);
          border-top: none; }
      .drop-area .hint {
        display: block;
        /*padding: 15px;*/
        font-size: 14px;
        color: #666;
        line-height: 30px; }
      .drop-area .no-supported-hint {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        padding: 30px;
        width: 100%;
        height: 60px;
        line-height: 30px;
        background-color: #eee;
        text-align: center;
        color: #666;
        font-size: 14px; }
      .drop-area:hover {
        cursor: pointer;
        border-color: rgba(0, 0, 0, 0.1);
        background-color: rgba(0, 0, 0, 0.05); }
</style>

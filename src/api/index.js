import axios from 'axios'
// import config from '../config'

const uri = 'http://localhost:8080/api/'

export default {
/*
  request (method, uri, data = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    var url = config.serverURI + uri
    return axios({ method, url, data })
  }
  */

  getData (endpoint) {
    // var data
    let obj = this
    axios.get(uri + endpoint)
      .then(function (response) {
        obj.origs = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
    return obj.origs
  },

  fullBalance () {
    var addresses = this.getData('addresses')

    addresses.forEach(function (item, i, arr) {
      // console.log(i + ': ' + item + ' (массив:' + arr + ')')
      console.log(this.getData('addresses/balance/' + item))
      // var balance = item
      // console.log(balance)
    })
  }
}

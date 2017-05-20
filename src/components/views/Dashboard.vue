<template>
  <section class="content">
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-aqua">
          <span class="info-box-icon"><i class="fa fa-money" aria-hidden="true"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">Full balance </span>
            <span class="info-box-number">{{wallet.fullbalance}}<small> Coins</small></span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-red">
          <span class="info-box-icon"><i class="fa fa-random"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">Transactions</span>
            <span class="info-box-number">{{transactions.count}}</span>
          </div>
        </div>
      </div>

      <!-- fix for small devices only -->
      <div class="clearfix visible-sm-block"></div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-green">
          <span class="info-box-icon"><i class="fa fa-table"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">Last block height</span>
            <span class="info-box-number">{{blocks.last.height}}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-yellow">
          <span class="info-box-icon"><i class="fa fa-usd" aria-hidden="true"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">Last block fee</span>
            <span class="info-box-number">{{blocks.last.fee}}</span>
          </div>
        </div>
      </div>
    </div>
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title"></h3>
          <div class="box-body row">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>Transactions Volume Overview</strong>
              </p>
              <canvas id="trafficBar" ></canvas>
            </div>
            <hr class="visible-xs-block">
            <div class="col-sm-6 col-xs-12">
              <p class="text-center">
                <strong>Peers Overview</strong>
              </p>
              <canvas id="peerPie"></canvas>
            </div>
          </div>
        </div>
      </div>

    <!-- Main row -->
    <!-- <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-yellow">
          <span class="info-box-icon"><i class="ion ion-ios-pricetag-outline"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">Inventory</span>
            <span class="info-box-number">5,200</span>

            <div class="progress">
              <div class="progress-bar" style="width: 50%"></div>
            </div>
                <span class="progress-description">
                  50% Increase
                </span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-green">
          <span class="info-box-icon"><i class="ion ion-ios-heart-outline"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">Mentions</span>
            <span class="info-box-number">92,050</span>

            <div class="progress">
              <div class="progress-bar" style="width: 20%"></div>
            </div>
                <span class="progress-description">
                  20% Increase
                </span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-red">
          <span class="info-box-icon"><i class="ion ion-ios-cloud-download-outline"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">Downloads</span>
            <span class="info-box-number">114,381</span>

            <div class="progress">
              <div class="progress-bar" style="width: 70%"></div>
            </div>
                <span class="progress-description">
                  70% Increase
                </span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box bg-aqua">
          <span class="info-box-icon"><i class="ion-ios-chatbubble-outline"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">Direct Messages</span>
            <span class="info-box-number">163,921</span>

            <div class="progress">
              <div class="progress-bar" style="width: 40%"></div>
            </div>
                <span class="progress-description">
                  40% Increase
                </span>
          </div>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
import Chart from 'chart.js'
// import axios from 'axios'
import { mapState } from 'vuex'
import ERA from 'era-javascript-api'
// var ERA = require('era-javascript-api')

// import api from '../../api'

export default {
  data () {
    return {
      generateRandomNumbers (numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      },
      wallet: {
        addresses: '',
        fullbalance: ''
      },
      transactions: {
        count: '',
        list: ''
      },
      blocks: {
        last: ''
      }
    }
  },
  created () {
    // var url = this.$store.state.serverURI

    /* axios.get(url + 'addresses')
      .then((response) => {
        this.wallet.addresses = response.data
        axios.get(url + 'addresses/balance/' + response.data[0])
          .then((response) => {
            var tuplebalance = (response.data).replace('Tuple3[', '').replace(']', '')
            tuplebalance = tuplebalance.replace('0E-8', 0).replace('0E-8', 0).replace('0E-8', 0)

            var fullbalance = tuplebalance.split(', ')
              .reduce((a, b) =>
                Number(a) + Number(b), 0
              )

            this.wallet.fullbalance = fullbalance
          })
      })

    axios.get(url + 'transactions')
      .then((response) => {
        var transactions = response.data[0].transactions
        this.transactions.list = transactions
        // console.log(transactions)
        this.transactions.count = transactions.length
      }) */
    // axios.get('http://datachains.world:9067/api/' + 'lastblock')
    //   .then((response) => {
    //     console.log(response.data)
    //   })

    let that = this
    ERA.block.last(function (data) {
      that.blocks.last = data
    })

    /* axios.get(url + 'blocks/last')
      .then((response) => {
        var block = response.data
        this.blocks.last = block
        // console.log(block)
      }) */
  },
  computed: {
    ...mapState([
      'person'
    ]),
    allTransactions () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    myTransactions () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    isMobile () {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    }
    /*
    addresses () {
      var vm = this
      axios.get(this.$store.state.serverURI + 'addresses')
        .then(function (response) {
          vm.wallet.addresses = response.data
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    */
  },
  mounted () {
    this.$nextTick(() => {
      var ctx = document.getElementById('trafficBar').getContext('2d')
      var config = {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: 'All Transactions',
            fill: false,
            borderColor: '#284184',
            pointBackgroundColor: '#284184',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: this.allTransactions
          }, {
            label: 'My Transactions',
            borderColor: '#4BC0C0',
            pointBackgroundColor: '#4BC0C0',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: this.myTransactions
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          },
          tooltips: {
            mode: 'label',
            xPadding: 10,
            yPadding: 10,
            bodySpacing: 10
          }
        }
      }

      new Chart(ctx, config) // eslint-disable-line no-new

      var pieChartCanvas = document.getElementById('peerPie').getContext('2d')
      var pieConfig = {
        type: 'pie',
        data: {
          labels: ['1', '2', '3'],
          datasets: [{
            data: [56.6, 37.7, 4.1],
            backgroundColor: ['#00a65a', '#f39c12', '#00c0ef'],
            hoverBackgroundColor: ['#00a65a', '#f39c12', '#00c0ef']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: !this.isMobile,
          legend: {
            position: 'bottom',
            display: true
          }
        }
      }

      new Chart(pieChartCanvas, pieConfig) // eslint-disable-line no-new
    })
  }}
</script>
<style>
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
</style>

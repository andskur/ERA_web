<template>
  <section class="content">
    <div class="row center-block">
      <!-- <h2>Blocks Explorer</h2> -->
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <!-- <h3 class="box-title">Data Table With Full Features</h3> -->
            <!-- Nav tabs -->
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="peersTable_wrapper">
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table id="peersTable" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>IP</th>
                        <th>Height</th>
                        <th>Ping mc</th>
                        <th>Reliable</th>
                        <th>Initiator</th>
                        <th>Finding ago</th>
                        <th>Online Time</th>
                        <th>Version</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table> 
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
// import $ from 'jquery'
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'
import axios from 'axios'

export default {
  name: 'Peers',
  data () {
    return {
      peers: null,
      error: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      axios.get(this.$store.state.serverURI + 'peers/detail')
        .then(response => {
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }

          // var peers = JSON.parse(response.data)
          var peers = response.data

          console.log(peers)
          console.log(typeof (peers))
          // console.log(Object.getOwnPropertyNames(peers))
        })
        .catch(error => {
          // Request failed.
          console.log('error', error.response)
        })

      // $.ajax({
      //   url: this.$store.state.serverURI + 'peers/detail'
      // })
      // .done(function (data) {
      //   console.log(data)
      // })
      // .fail(function () {
      //   console.log('error')
      // })

      // $('#peersTable').DataTable({
      //   order: [[ 0, 'desc' ]],
      //   lengthMenu: [[10, 20, -1], [10, 20, 'All']],
      //   ajax: {
      //     url: this.$store.state.serverURI + 'peers/detail',
      //     dataSrc: ''
      //   },
      //   columns: [
      //   { 'data': 'no' },
      //   { 'data': 'ip' },
      //   { 'data': 'height' },
      //   { 'data': 'ping' },
      //   { 'data': 'reliable' },
      //   { 'data': 'finding' },
      //   { 'data': 'time' },
      //   { 'data': 'version' }
      //   ]
      // })
    })
  }
}
</script>

<style>

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}
</style>

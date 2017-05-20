<template>
  <section class="content">
    <div class="row center-block">
      <!-- <h2>Blocks Explorer</h2> -->
      <!-- <h3>Last block height - {{this.last.height}}</h3> -->
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <!-- <h3 class="box-title">Data Table With Full Features</h3> -->
            <!-- Nav tabs -->
            <!-- <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active"><a href="#blocks_all" aria-controls="blocks_all" role="tab" data-toggle="tab">All Blocks</a></li>
              <li role="presentation"><a href="#blocks_my" aria-controls="blocks_my" role="tab" data-toggle="tab">Your Blocks</a></li>
            </ul> -->
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <!-- <div class="tab-content"> -->
              <!-- <div role="tabpanel" class="tab-pane fade in active" id="blocks_all"> -->
                <div class="dataTables_wrapper form-inline dt-bootstrap" id="blocksAll_wrapper">
                  <div class="row">
                    <div class="col-sm-6">
                      <div id="blocksAll_length" class="dataTables_length">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 table-responsive">
                      <table id="blocksAll" class="table table-bordered table-striped dataTable">
                        <thead>
                          <tr>
                            <th>Height</th>
                            <th>Timestamp</th>
                            <th>Creator</th>
                            <th>Generating Balance</th>
                            <th>Transactions</th>
                            <th>Fee</th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table> 
                    </div>
                  </div>
                </div>
              <!-- </div> -->
              <!-- <div role="tabpanel" class="tab-pane" id="blocks_my">
                <div class="dataTables_wrapper form-inline dt-bootstrap" id="blocksMy_wrapper">
                  <div class="row">
                    <div class="col-sm-6">
                      <div id="blocksMy_length" class="dataTables_length">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 table-responsive">
                      <table id="blocksMy" class="table table-bordered table-striped dataTable">
                        <thead>
                          <tr>
                            <th>Height</th>
                            <th>Timestamp</th>
                            <th>Creator</th>
                            <th>Generating Balance</th>
                            <th>Transactions</th>
                            <th>Fee</th>
                          </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table> 
                    </div>
                  </div>
                </div>
              </div> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
import ERA from 'era-javascript-api'
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'

export default {
  name: 'Blocks',
  data () {
    return {
      last: null,
      fromheight: null,
      error: null
    }
  },
  created () {
    let that = this
    ERA.block.last(function (data) {
      that.last = data
    })
  },
  mounted () {
    this.$nextTick(() => {
      $.ajax({
        url: 'http://datachains.world:9067/api/lastblock',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/plain; charset=x-user-defined')
        }
      })
      .done(function (data) {
        var json = JSON.parse(data)
        var fromheight = json.height - 29
        $('#blocksAll').DataTable({
          order: [[ 0, 'desc' ]],
          lengthMenu: [[10, 20, -1], [10, 20, 'All']],
          ajax: {
            url: 'http://datachains.world:9067/api/blocksfromheight/' + fromheight + '/' + 30,
            dataSrc: 'blocks'
          },
          columns: [
            { 'data': 'height' },
            { 'data': 'timestamp' },
            { 'data': 'creator' },
            { 'data': 'generatingBalance' },
            { 'data': 'transactions' },
            { 'data': 'fee' }
          ]
        })
      })

      /* $.get('http://datachains.world:9047/api/lastblock', function (data) {
        var fromheight = data.height - 29
        $('#blocksAll').DataTable({
          order: [[ 0, 'desc' ]],
          lengthMenu: [[10, 20, -1], [10, 20, 'All']],
          ajax: {
            url: 'http://datachains.world:9047/api/blocksfromheight/' + fromheight + '/' + 30,
            dataSrc: ''
          },
          columns: [
            { 'data': 'height' },
            { 'data': 'timestamp' },
            { 'data': 'creator' },
            { 'data': 'generatingBalance' },
            { 'data': 'transactions' },
            { 'data': 'fee' }
          ]
        })
      }) */
      /* $('#blocksMy').DataTable({
        order: [[ 0, 'desc' ]],
        lengthMenu: [[10, 20, -1], [10, 20, 'All']],
        ajax: {
          url: this.$store.state.serverURI + 'blocks/',
          dataSrc: ''
        },
        columns: [
          { 'data': 'height' },
          { 'data': 'timestamp' },
          { 'data': 'creator' },
          { 'data': 'generatingBalance' },
          { 'data': 'transactions' },
          { 'data': 'fee' }
        ]
      }) */
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

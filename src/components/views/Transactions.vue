<template>
  <section class="content">
    <div class="row center-block">
      <!-- <h2>Blocks Explorer</h2> -->
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <!-- <h3 class="box-title">Data Table With Full Features</h3> -->
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="transactionsTable_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="transactionsTable_length" class="dataTables_length">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table id="transactionsTable" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr>
                        <th>Confirmations</th>
                        <th>Timestamp</th>
                        <th>Type</th>
                        <th>Creator</th>
                        <th>Item</th>
                        <th>Confirmed</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table> 
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
import axios from 'axios'
import $ from 'jquery'
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'

export default {
  name: 'Transactions',
  data () {
    return {
      transactions: '',
      error: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      axios.get(this.$store.state.serverURI + 'transactions')
      .then((response) => {
        if (response.status !== 200) {
          this.error = response.statusText
          return
        }
        var transactions = response.data[0].transactions

        this.transactions = transactions

        $('#transactionsTable').DataTable({
          order: [[ 0, 'desc' ]],
          lengthMenu: [[10, 20, -1], [10, 20, 'All']],
          data: transactions,
          columns: [
            { 'data': 'confirmations' },
            { 'data': 'asset.timestamp' },
            { 'data': 'record_type' },
            { 'data': 'creator' },
            { 'data': 'asset.name' },
            { 'data': 'asset.isConfirmed' }
          ]
        })
      })
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

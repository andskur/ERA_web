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
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="blocksAll_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="blocksAll_length" class="dataTables_length">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table id="table_assets_all" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Key</th>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Quantity</th>
                        <th>Operations</th>
                        <th>Movable</th>
                        <th>Divisible</th>
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
import $ from 'jquery'
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'

export default {
  name: 'Blocks',
  mounted () {
    function format (d) {
      return d.description
    }
    this.$nextTick(() => {
      var dt = $('#table_assets_all').DataTable({
        order: [[ 0, 'asc' ]],
        lengthMenu: [[10, 20, -1], [10, 20, 'All']],
        ajax: {
          url: 'http://aronicle/api/assets/full',
          dataSrc: ''
        },
        columns: [
          {
            'class': 'details-control',
            'orderable': false,
            'data': null,
            'defaultContent': '<i class="fa fa-plus-square" aria-hidden="true"></i>'
          },
         { 'data': 'key' },
         { 'data': 'name' },
         { 'data': 'owner' },
         { 'data': 'quantity' },
         { 'data': 'operations' },
         { 'data': 'isMovable' },
         { 'data': 'isDivisible' }
        ]
      })
      var detailRows = []
      $('#table_assets_all tbody').on('click', 'tr td.details-control', function () {
        var tr = $(this).closest('tr')
        var row = dt.row(tr)
        var idx = $.inArray(tr.attr('id'), detailRows)
        if (row.child.isShown()) {
          tr.removeClass('details')
          row.child.hide()
          detailRows.splice(idx, 1)
        } else {
          tr.addClass('details')
          row.child(format(row.data())).show()
          if (idx === -1) {
            detailRows.push(tr.attr('id'))
          }
        }
      })
      dt.on('draw', function () {
        $.each(detailRows, function (i, id) {
          $('#' + id + ' td.details-control').trigger('click')
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

.details-control {
  cursor: pointer;
}
</style>

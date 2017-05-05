<template>
  <section class="content">
    <div class="row">
      <div class="col-md-9">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">{{$route.name}}</h3>
            <div v-if="$route.name === 'Inbox'" class="box-tools pull-right">
              <div class="has-feedback">
                <input type="text" class="form-control input-sm" placeholder="Search Mail">
                <i class="fa fa-search form-control-feedback" aria-hidden="true"></i>
              </div>
            </div>
          </div>
          <div class="box-body no-padding">
          	<router-view></router-view>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <router-link v-if="$route.name === 'Inbox'" to="/mails/new">
          <button class="btn btn-primary btn-block margin-bottom"><i class="fa fa-paper-plane-o"></i> New mail</button>
        </router-link>
        <router-link v-else to="/mails">
      	  <button class="btn btn-primary btn-block margin-bottom"><i class="fa fa-inbox"></i> Back to Inbox</button>
        </router-link>
        <div class="box box-solid">
          <div class="box-header with-border">
            <h3 class="box-title">Folders</h3>

            <div class="box-tools">
              <button type="button" class="btn btn-box-tool" data-widget="collapse">
              	<i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="box-body no-padding">
            <ul class="nav nav-pills nav-stacked">
              <li class="active"><a href="#"><i class="fa fa-inbox"></i> Inbox
                <span class="label label-primary pull-right">1</span></a></li>
              <li><a href="#"><i class="fa fa-envelope-o"></i> Sent</a></li>
              <li><a href="#"><i class="fa fa-file-text-o"></i> Drafts</a></li>
              <li><a href="#"><i class="fa fa-filter"></i> Junk <span class="label label-warning pull-right">65</span></a>
              </li>
              <li><a href="#"><i class="fa fa-trash-o"></i> Trash</a></li>
            </ul>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Mails',
  data: function () {
    return {
      error: ''
    }
  }
}
</script>
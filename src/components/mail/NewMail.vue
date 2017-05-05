<template>
   <div class="box-body">
    <div class="form-group">
      <input class="form-control" placeholder="To:">
    </div>
    <div class="form-group">
      <input class="form-control" placeholder="Subject:">
    </div>
    <div class="form-group">
      <Vueditor :height="300"></Vueditor>
    </div>
    <div class="pull-left">
      <div class="form-group">
        <div class="btn btn-default btn-file">
          <i class="fa fa-paperclip"></i> Attachment
          <input type="file" name="attachment">
        </div>
        <p class="help-block">Max. 32MB</p>
      </div>
    </div>
    <div class="pull-right">
      <!-- <button type="button" class="btn btn-default"><i class="fa fa-pencil"></i> Draft</button> -->
      <button type="submit" class="btn btn-primary"><i class="fa fa-envelope-o"></i> Send</button>
    </div>
  </div>
</template>
<script>
  import faker from 'faker'

  export default {
    name: 'NewMail',
    data: function () {
      return {
        message: '',
        error: ''
      }
    },
    created () {
      var msg = {
        name: faker.fake('{{name.firstName}} {{name.lastName}}'),
        subject: faker.fake('{{random.words}}'),
        body: faker.fake('{{hacker.phrase}}. {{hacker.phrase}}')
      }
      this.message = msg
    }
  }
</script>
<style>
  .ve-design {
    min-height: 150px;
  }
  .ve-design > div {
    min-height: 150px;
  }
</style>
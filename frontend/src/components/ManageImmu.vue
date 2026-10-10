<template>
  <div class="content">
      <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4>Manage Immunization</h4>
                </div>
                <!-- /.panel-heading -->
                <div class="panel-body">
                    <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
                        <thead>
                            <tr>
                                <th>#SN</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Dose(s)</th>
                                <th>Note</th>
                                <th>Description</th>
                                <th>Is Active</th>
                                <th>Taken By</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                         <tbody v-if="children">
                            <template v-for="(guy, index, key) in immu">
                                <tr :key="key">
                                    <td>{{index +1}}</td>
                                    <td>{{guy.title}}</td>
                                    <td>{{guy.type}}</td>
                                    <!-- <td>{{guy.town}}</td> -->
                                    <td>{{guy.dose}}</td>
                                    <td>{{guy.note}}</td>
                                    <td>{{guy.desc}}</td>
                                    <td>{{guy.isActive}}</td>
                                    <td>{{guy.registeredChid}}</td>
                                    <td>{{guy.createdAt}}</td>
                                </tr>
                            </template>
                        </tbody>
                        <tbody v-else>
                            <tr class="table-secondary">
                                <td colspan="9">
                                <p class="text-center">There is no data</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- /.table-responsive -->
                    
                </div>
                <!-- /.panel-body -->
            </div>
            <!-- /.panel -->
        </div>
        <!-- /.col-lg-12 -->
      </div>  
  </div>
</template>

<script>
import {DataMixin} from '../mixins/DataMixin'

export default {
  name: 'ManageImmunization',
  mixins: [DataMixin],
  data: () => ({
    msg: 'Welcome to ManageImmunization Component!'
  }),
   methods: {
      run () {
          this.getImmunization()
      }
  },
  mounted () {
      this.run()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media only screen and (max-width: 600px) {

  }

  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
    
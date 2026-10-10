<template>
  <div class="content">
      <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4>Manage Parents</h4>
                </div>
                <!-- /.panel-heading -->
                <div class="panel-body">
                    <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
                        <thead>
                            <tr>
                                <th>#SN</th>
                                <th>Fullname</th>
                                <th>Dob</th>                 
                                <th>Town</th>
                                <th>Address</th>
                                <th>Home Phone Number</th>
                                <th>Office Phone Number</th>
                                <th>Children</th>
                            </tr>
                        </thead>
                        <tbody v-if="parent">
                            <template v-for="(guy, index, key) in parent">
                                <tr :key="key">
                                    <td>{{index +1}}</td>
                                    <td>{{guy.surname + " " + guy.otherNames}}</td>
                                    <td>{{guy.dob}}</td>
                                    <td>{{guy.town}}</td>
                                    <td>{{guy.address}}</td>
                                    <td>{{guy.mobileNo1}}</td>
                                    <td>{{guy.mobileNo2}}</td>
                                    <td>
                                        <button class="btn btn-block btn-social btn-dropbox" data-toggle="modal" data-target="#myModal" @click="clickOnParent(index)">
                                            <i class="fa fa-dropbox"></i> 
                                        Click to view
                                        </button>
                                    </td>
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

                <!-- Modal -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title" id="myModalLabel"><b>{{getClickedParent.surname + " " + getClickedParent.otherNames}}'s</b> Children</h4>
                            </div>
                            <div class="modal-body">
                               <table width="100%" class="table table-striped table-bordered table-hover">
                                   <thead>
                                       <tr>
                                            <th>#SN</th>
                                            <th>ID</th>
                                            <th>Fullname</th>    
                                       </tr>
                                   </thead>
                                   <tbody>
                                       <template v-for="(kid, index, key) in parentChildren">
                                            <tr :key="key">
                                                <td>{{index +1}}</td>
                                                <td>{{kid.id}}</td>
                                                <td>{{kid.name}}</td>
                                            </tr>
                                       </template>
                                   </tbody>
                               </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default btn-danger" data-dismiss="modal">Close</button> 
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>
                <!-- /.modal -->

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
  name: 'ManageParents',
  mixins: [DataMixin],
  data: () => ({
    msg: 'Welcome to ManageParents Component!',
    getClickedParent: {},
    parentChildren: {}
  }),   
  methods: {
      run () {
        this.getParent()
      },
      clickOnParent (no) {
        console.log(no)
        this.getClickedParent = this.parent[no]
        this.parentChildren = this.getClickedParent.child
        console.log(this.getClickedParent)
        console.log(this.parentChildren)
      }
  },
  mounted() {
    this.run()
  },
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
    
<template>
  <div class="content">
      <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4>Manage Children</h4>
                </div>
                <!-- /.panel-heading -->
                <div class="panel-body">
                    <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
                        <thead>
                            <tr>
                                <th>#SN</th>
                                <th>Fullname</th>
                                <th>DoB</th>
                                <!-- <th>Town</th> -->
                                <th>Address</th>
                                <th>Parent ID</th>
                                <th>Blood Group</th>
                                <th>Genotype</th>
                                <th>Immunization Recieved</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="children">
                            <template v-for="(guy, index, key) in children">
                                <tr :key="key">
                                    <td>{{index +1}}</td>
                                    <td>{{guy.surname + " " + guy.otherNames}}</td>
                                    <td>{{guy.dob}}</td>
                                    <!-- <td>{{guy.town}}</td> -->
                                    <td>{{guy.address}}</td>
                                    <td>{{guy.parentID}}</td>
                                    <td>{{guy.bloodGroup}}</td>
                               
                                    <td>{{guy.genotype}}</td>
                                    <td>
                                        <button class="btn btn-block btn-social btn-dropbox" data-toggle="modal" data-target="#myModal" @click="clickOnChild(index)">
                                            <i class="fa fa-dropbox"></i> 
                                        Click to view
                                        </button>
                                    </td>
                                    <td>
                                        <button class="btn btn-block btn-social btn-dropbox" data-toggle="modal" data-target="#myModal2" @click="clickOnFor(index)">
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
                    



                    <!-- Modal -->
                    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title" id="myModalLabel">Immunizations Taken</h4>
                                </div>
                                <div class="modal-body">
                                    <table width="100%" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                    <th>#SN</th>
                                                    <th>Immunization ID</th>
                                                    <th>Date</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="(info, index, key) in childImmu">
                                                    <tr :key="key">
                                                        <td>{{index +1}}</td>
                                                        <td>{{info._immuId}}</td>
                                                        <td>{{info.date}}</td>
                                                    </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    
                                </div>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->

                    <!-- Modal -->
                    <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModal2Label" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="alert alert-success animated slideInRight" v-if="linkSuccess">
                                    <p>Immunization assigned successfully</p> 
                                </div>
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title" id="myModal2Label">Add Immunization</h4>
                                </div>
                                <div class="modal-body">
                                    <form action="" class="container">
                                        <div class="row">
                                             <div class="col-md-6">
                                                 <div class="form-group">
                                                     <label class = "control-label">Choose Immunization  
                                                    </label>
                                                 </div>
                                                <select class="form-control" v-model="immuId">
                                                    <template v-for="(guy, index, key) in immu">
                                                    <option :key="key" :value="guy._id">
                                                        {{guy.title }} 
                                                    </option>
                                                    </template>
                                                </select>
                                             </div>
                                        </div>
                                        <br>
                                         <div class="row">
                                            <div class="col-md-6">
                                            <button type="button" class="btn btn-primary btn-lg  btn-block btn-primary" @click="linkImmu">Assign Immunization</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    
                                </div>
                            </div>
                            <!-- /.modal-content -->
                        </div>
                        <!-- /.modal-dialog -->
                    </div>
                    <!-- /.modal -->
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
import Functions from '../services/Functions'

export default {
  name: 'ManageChildren',
  mixins: [DataMixin],
  data: () => ({
    msg: 'Welcome to ManageChildren Component!',
    getClickedChild: {},
    childImmu: {},
    getID: '',
    immuId: '',
    linkSuccess: ''
  }),
  methods: {
      run () {
          this.getChild()
          this.getImmunization()
      },
    clickOnChild (no) {
        console.log(no)
        this.getClickedChild = this.children[no]
        this.childImmu = this.getClickedChild.recieved
        console.log(this.getClickedChild)
        console.log(this.childImmu)
    },
    clickOnFor (no) {
        console.log(no)
        this.linkSuccess = ''
        this.getID = this.children[no]._id
        console.log(this.getID)
    },
    async linkImmu () {
        console.log(true)
        try {
          const response = await Functions.linkImmu({
            immuId: this.immuId,
            childId: this.getID
          })
          console.log(response)
          console.log(true)
          this.linkSuccess = response.data.success
        } catch (error) {
          this.error = error.response.data.error
          console.log(error)
        }
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
    
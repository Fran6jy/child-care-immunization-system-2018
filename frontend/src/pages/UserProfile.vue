<template>
  <div class="content" id="page-top">
      <!-- <DashboardNav></DashboardNav> -->
      <!-- <div id="page-wrapper"> -->
            <!-- <div class="container-fluid"> -->
                <div class="row">
                    <div class="col-lg-12">
                        <h2 class="page-header">User Profile</h2>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->

                <div class="row">
                <div class="col-lg-12">
                    <div class="jumbotron">
                      <form role="form" class="container">
                        <div class="form-group input-group">
                          <span class="input-group-addon">User ID</span>
                          <input type="text" class="form-control" placeholder="userId" disabled :value="this.$store.state.adminDetails._id">
                        </div>
                        <div class="form-group input-group">
                          <span class="input-group-addon">Fullname</span>
                          <input type="text" class="form-control" placeholder="Username" disabled :value="this.$store.state.adminDetails.fullName">
                        </div>
                        <div class="form-group input-group">
                          <span class="input-group-addon">Email</span>
                          <input type="email" class="form-control" placeholder="Email" disabled :value="this.$store.state.adminDetails.email">
                        </div>
                        <div class="form-group input-group">
                          <span class="input-group-addon">Privilege</span>
                          <input type="text" class="form-control" placeholder="Privilege" disabled :value="this.$store.state.adminDetails.privilege">
                        </div>
                        <div class="form-group input-group">
                          <span class="input-group-addon">Date Created</span>
                          <input type="text" class="form-control" placeholder="dateCreated" disabled :value="this.$store.state.adminDetails.createdAt">
                        </div>
                      </form>
                    </div>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- </div> -->
            <!-- /.container-fluid -->
        <!-- </div> -->
        <!-- /#page-wrapper -->
  </div>
</template>

<script>
import DashboardNav from '../components/DashboardNav'

export default {
  name: 'UserProfile',
  data: () => ({
    msg: 'Welcome to UserProfile Component!'
  }),
  components: {
    DashboardNav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .breadcrumb {
    margin-top: 50px;
  }
  #cview {
    margin-bottom: 20px;
  }
  .view {
    cursor: pointer;
  }
  .input-group-addon {
    font-weight: bolder;
  }
  @media only screen and (max-width: 600px) {

  }

  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
    
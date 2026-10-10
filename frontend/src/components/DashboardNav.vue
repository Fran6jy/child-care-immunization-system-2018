<template>
  <!-- Navigation -->
  <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
      <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="" @click="doNothing()">Adminstrator Dashboard</a>
      </div>
      <!-- /.navbar-header -->

      <ul class="nav navbar-top-links navbar-right">
          <!-- /.dropdown -->
          <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                  <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
              </a>
              <ul class="dropdown-menu dropdown-user">
                  <li><a href="" @click="userProfile"><i class="fa fa-user fa-fw"></i> User Profile</a>
                  </li>
                  <li><a href="" @click="settings"><i class="fa fa-gear fa-fw"></i> Settings</a>
                  </li>
                  <li class="divider"></li>
                  <li><a href="" @click="logOut"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                  </li>
              </ul>
              <!-- /.dropdown-user -->
          </li>
          <!-- /.dropdown -->
      </ul>
      <!-- /.navbar-top-links -->

      <div class="navbar-default sidebar" role="navigation">
          <div class="sidebar-nav navbar-collapse">
              <ul class="nav" id="side-menu">
                  <!-- <li class="sidebar-search">
                      <div class="input-group custom-search-form">
                          <input type="text" class="form-control" placeholder="Search...">
                          <span class="input-group-btn">
                          <button class="btn btn-default" type="button">
                              <i class="fa fa-search"></i>
                          </button>
                      </span>
                      </div>
  
                  </li> -->
                  <li>
                      <a href="" @click="loadDashboard"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
                  </li>
                  <li>
                      <a href="" @click="loadAddParents"><i class="fa fa-edit fa-fw"></i> Add Parents</a>
                  </li>
                  <li>
                      <a href="" @click="loadAddChildren"><i class="fa fa-edit fa-fw"></i> Add Children</a>
                  </li>
                  <li>
                      <a href="" @click="loadAddImmunization"><i class="fa fa-edit fa-fw"></i> Add Immunization</a>
                  </li>
                  <li>
                    <a href="" @click="showSecondLevel"><i class="fa fa-bar-chart-o fa-fw"></i> Manage Recourses 
                    <i class="fa fa-sort-down fa-fw pull-right" v-if="showDown"></i>
                    <i class="fa fa-sort-up fa-fw pull-right" v-if="!showDown"></i>
                    </a>
                    <ul class="nav nav-second-level animated slideInLeft" v-if="secondLevel">
                        <li>
                            <a href="" @click="manageParents">Manange Parents</a>
                        </li>
                        <li>
                            <a href="" @click="manageChildren">Manange Children</a>
                        </li>
                        <li>
                            <a href="" @click="manageImmu">Manange Immunization</a>
                        </li>
                    </ul>
                  </li>
                  <li>
                      <a href="" @click="settings"><i class="fa fa-gear fa-fw"></i> Settings</a>
                  </li>
                  <li>
                      <a href="" @click="logOut"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                  </li>
              </ul>
          </div>
          <!-- /.sidebar-collapse -->
      </div>
      <!-- /.navbar-static-side -->
  </nav>
</template>

<script>
export default {
  name: 'DashboardNav',
  data: () => ({
    msg: 'Welcome to DashboardNav Component!',
    secondLevel: false,
    showDown: true
  }),
  methods: {
    doNothing (e) {
        e.preventDefault()
    },
    loadDashboard (e) {
        e.preventDefault()
        this.$router.push({name: 'UserProfile'})
    },
    loadAddParents (e) {
        e.preventDefault()
        this.$router.push({name: 'AddParents'})
    },
    loadAddChildren (e) {
        e.preventDefault()
        this.$router.push({name: 'AddChildren'})
    },
    loadAddImmunization (e) {
        e.preventDefault()
        this.$router.push({name: 'AddImmunization'})
    },
    settings (e) {
        e.preventDefault()
        this.$router.push({name: 'Settings'})
    },
    logOut (e) {
        e.preventDefault()
        this.$store.dispatch('setToken', null)
        this.$router.push('/')
    },
    userProfile (e) {
        e.preventDefault()
        this.$router.push({name: 'UserProfile'})
    },
    showSecondLevel (e) {
        e.preventDefault()
        this.secondLevel = !this.secondLevel
        this.showDown = !this.showDown
    },
    manageParents (e) {
        e.preventDefault()
        this.$router.push({name: 'ManageParents'})
    },
    manageChildren (e) {
        e.preventDefault()
        this.$router.push({name: 'ManageChildren'})
    },
    manageImmu (e) {
        e.preventDefault()
        this.$router.push({name: 'ManageImmu'})
    }
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

<template>
  <div class="content">
      <h2>Settings <i class="fa fa-gear small"></i></h2>
      <hr>
      <h3>Update Password</h3>

      <div class="alert alert-danger animated slideInRight" v-if="formError">
        <p v-if="formerPassError">{{formerPassError}}</p> 
        <p v-if="newPassError">{{newPassError}}</p> 
      </div>

      <div class="alert alert-danger animated slideInRight" v-if="changeError">
        <p v-if="changeError">{{changeError}}</p> 
      </div>

      <div class="alert alert-danger animated slideInRight" v-if="error">
        <p v-if="error">{{error}}</p> 
      </div>

    <div class="alert alert-success animated slideInRight" v-if="changeSucess">
        <p>{{changeSucess}}</p> 
    </div>

      <form role="form">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group" :class="{hasError: formerPassError || error || changeError}">
              <label>Former Password</label>
              <input class="form-control" v-model="formerPass" type="password">
              
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-group" :class="{hasError: newPassError || error}">
              <label>New Password</label>
              <input class="form-control" v-model="newPass" type="password">
              
            </div>
          </div>

          
        </div>
        <div class="row">
        
          <div class="col-md-8">
            <button type="button" class="btn btn-primary btn-lg btn-block btn-success" @click="updatePassword" :class="{disabled: btnDisabled}">
              <div class="loader" v-if="loaderSwitch"></div>
              <span v-else>Update Password</span>
            </button>
          </div>
          <div class="col-md-4">
            <button type="button" class="btn btn-primary btn-lg  btn-block btn-primary" @click="cancelAll" :class="{disabled: btnDisabled}">Cancel </button>
          </div>
        </div>
      </form>
      <hr>
  </div>
</template>

<script>
import {LoaderMixin} from '../mixins/LoaderMixin'
import AuthService from '../services/AuthService'

export default {
  name: 'Settings',
  mixins: [LoaderMixin],
  data: () => ({
    msg: 'Welcome to Settings Component!',
    formerPass: '',
    newPass: '',
    error: '',
    changeSucess: '',
    formerPassError: '',
    newPassError: '',
    changeError: '',
    formError: false
  }),
  methods: {
    cancelAll (e) {
      e.preventDefault()
      this.formerPass = ''
      this.formerPassError = ''
      this.newPass = ''
      this.newPassError = ''
      this.changeSucess = ''
      this.formError = false
      this.error = ''
      this.changeError = ''
    },
    async updatePassword (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      this.formError = false
      this.changeSucess = ''
      this.changeError = ''
      this.error = ''
      this.formerPassError = ''
      this.newPassError = ''
      if (this.formerPass.length === 0) {
        this.formerPassError = "Invalid Former Password Supplied"
        go = false
      }
      if (this.newPass.length === 0) {
        this.newPassError = "Invalid New Password Supplied"
        go = false
      }
      if (go) {
        this.formError = false
        try {
          const response = await AuthService.AdminPassUpdate({
            formerPass: this.formerPass,
            newPass: this.newPass
          })
          console.log(response)
          this.timeOut()
          this.changeSucess = response.data.success
          this.newPass = ''
          this.formerPass = ''
        } catch (error) {
          this.error = error.response.data.error
          this.changeError = error.response.data.error_formerPass
          this.timeOut()
        }
      } else {
        this.formError = true
        this.timeOut()
      }
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
    
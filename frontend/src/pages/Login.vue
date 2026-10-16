<template>
  <div class="container">
    
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <div class="alert alert-success animated slideInLeft" v-if="loginSuccess">
              <strong>Authenication Successful</strong> 
              <br>
              Please wait...
            </div>
            <div class="imgHolder text-center"> 
              <h1 id="logoText">UITH IMMUNIZATION UNIT</h1>
            </div>
            <div class="login-panel panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title"><b class="text-center">Immu Adminstrator Login</b></h3>
                </div>
                <div class="panel-body">
                    <p v-if="isDemo"><strong>Public demo login</strong><br>demo@example.test / DemoPass2018!</p>
                    <form role="form">
                        <fieldset>
                            <div class="form-group" :class="{hasError: loginEmailError}">
                              <label for="loginEmail">Email address</label>
                              <input class="form-control" id="loginEmail" type="text" v-model="loginEmail" aria-describedby="loginEmailError">
                              <small id="loginEmailError" class="form-text text-danger animated slideInUp" v-if="loginEmailError">{{loginEmailError}}</small>
                            </div>
                            <div class="form-group" :class="{hasError: loginPassError}">
                              <label for="loginPass">Password</label>
                              <input class="form-control" id="loginPass" type="password" v-model="loginPass" aria-describedby="loginPassError">
                              <small id="loginPassError" class="form-text text-danger animated slideInUp" v-if="loginPassError">{{loginPassError}}</small>
                            </div>
                            <button type="button" class="btn btn-success btn-block text-white btn-md" @click="sendLogin" :class="{disabled: btnDisabled}">
                              <div class="loader" v-if="loaderSwitch"></div>
                              <span v-else>Login</span>
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {LoaderMixin} from '../mixins/LoaderMixin'
import AuthService from '../services/AuthService'

export default {
  name: 'Login',
  mixins: [LoaderMixin],
  data () {
    return {
      msg: 'Welcome to Your Immunization App',
      isDemo: process.env.DEMO_MODE === 'true',
      loginEmail: process.env.DEMO_MODE === 'true' ? 'demo@example.test' : '',
      loginPass: process.env.DEMO_MODE === 'true' ? 'DemoPass2018!' : '',
      loginEmailError: '',
      loginPassError: '',
      loginSuccess: '',
      error: ''
    }
  },
  methods: {
    async sendLogin (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      this.loginEmailError = ''
      this.loginPassError = ''
      if (this.loginEmail.length === 0) {
        this.loginEmailError = 'Invalid Email Address supplied'
        go = false
      }
      if (this.loginPass.length === 0) {
        this.loginPassError = 'Invalid Password supplied'
        go = false
      }
      if (go) {
        try {
          const response = await AuthService.AdminLogin({
            email: this.loginEmail,
            password: this.loginPass
          })
          console.log(response)
          this.loginSuccess = response.data.success
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setAdmin', response.data.adminDetails)
          this.timeOut()
          setTimeout(() => {
            this.$router.push({name: 'UserProfile'})
          }, 2000)
        } catch (error) {
          this.error = error.response.data.error
          this.loginEmailError = error.response.data.error_Email
          this.loginPassError = error.response.data.error_Password
          this.loginPass = ''
          this.timeOut()
        }
      } else {
        this.timeOut()
      }
    },
    goToForgotPassword (e) {
      e.preventDefault()
      this.$router.push({name: 'ForgotPassword'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .alert {
    margin-top: 30px;
  }
  #logoText{
    font-weight: bolder;
    text-decoration: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 37px;
    letter-spacing: 3px;
    color: #555555;
    display: block;
   text-shadow: 1px 2px green;
  }
</style>

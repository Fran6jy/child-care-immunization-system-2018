<template>
  <div class="content">
      <h2>Add Parents <i class="fa fa-plus small"></i></h2>
      <hr>
      <div class="alert alert-danger animated slideInRight" v-if="formError">
        <p v-if="surnameError">{{surnameError}}</p> 
        <p v-if="otherNamesError">{{otherNamesError}}</p> 
        <p v-if="dobError">{{dobError}}</p>
        <p v-if="addressError">{{addressError}}</p>
        <p v-if="mobileNumberError">{{mobileNumberError}}</p>
        <p v-if="townError">{{townError}}</p>
        <p v-if="homeContactNumberError">{{homeContactNumberError}}</p>
      </div>

      <div class="alert alert-danger animated slideInRight" v-if="createError">
        <p>{{createError}}</p>
      </div>

      <div class="alert alert-success animated slideInRight" v-if="createSuccess" :class="{SlideOutLeft: fadeClass}">
        <p>{{createSuccess}}</p> 
      </div>

      <form role="form">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group" :class="{hasError: surnameError}">
              <label>Surname</label>
              <input class="form-control" v-model="surname">
              
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group" :class="{hasError: otherNamesError}">
              <label>Other Names</label>
              <input class="form-control" v-model="otherNames">
              
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group" :class="{hasError: dobError}">
              <label>DOB</label>
              <input class="form-control" type="date" v-model="dob">
              
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group" :class="{hasError: townError}">
              <label>Town</label>
              <input class="form-control" v-model="town">
              
            </div>
          </div>
        </div>
        <div class="form-group" :class="{hasError: addressError}">
          <label>Address</label>
          <textarea class="form-control" rows="5" v-model="address"></textarea>
          
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group" :class="{hasError: mobileNumberError}">
              <label>Mobile Number</label>
              <input class="form-control" v-model="mobileNumber">
              
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group" :class="{hasError: homeContactNumberError}">
              <label>Home Contact Number</label>
              <input class="form-control" v-model="homeContactNumber">
              
            </div>
          </div>
        </div>
        <div class="row">
          
          <div class="col-md-4">
            <button type="button" class="btn btn-primary btn-lg btn-block btn-info" :class="{disabled: btnDisabled}" @click="AddParentAndNav">
              <div class="loader" v-if="loaderSwitch2"></div>
              <span v-else>Proceed To Add Children</span>
            </button>
          </div>
          <div class="col-md-4">
            <button type="button" class="btn btn-primary btn-lg btn-block btn-success" @click="AddParent" :class="{disabled: btnDisabled}">
              <div class="loader" v-if="loaderSwitch"></div>
              <span v-else>Just Save</span>
            </button>
          </div>
          <div class="col-md-4">
            <button type="button" class="btn btn-primary btn-lg  btn-block btn-primary" @click="cancelAll" :class="{disabled: btnDisabled}">Cancel All</button>
          </div>

        </div>
      </form>
      <hr>
  </div>
</template>

<script>
import demoStorage from '../services/DemoStorage'
import {LoaderMixin} from '../mixins/LoaderMixin'
import Functions from '../services/Functions'

export default {
  name: 'AddParents',
  mixins: [LoaderMixin],
  data: () => ({
    msg: 'Welcome to AddParents Component!',
    surname: '',
    otherNames: '',
    dob: '',
    town: '',
    address: '',
    mobileNumber: '',
    homeContactNumber: '',
    surnameError: '',
    otherNamesError: '',
    dobError: '',
    townError: '',
    addressError: '',
    mobileNumberError: '',
    homeContactNumberError: '',
    formError: false,
    error: '',
    createSuccess: '',
    createError: '',
    fadeClass: false
  }),
  methods: {
    cancelAll (e) {
      e.preventDefault()
      this.surname = ''
      this.surnameError = ''
      this.otherNames = ''
      this.otherNamesError = ''
      this.dob = ''
      this.dobError = ''
      this.address = ''
      this.addressError = ''
      this.mobileNumber = ''
      this.mobileNumberError = ''
      this.town = ''
      this.townError = ''
      this.address = ''
      this.addressError = ''
      this.homeContactNumber = ''
      this.homeContactNumberError = ''
      this.formError = false
      this.error = ''
      this.createError = ''
    },
    async AddParent (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      this.formError = false
      this.createSuccess = ''
      this.surnameError = ''
      this.otherNamesError = ''
      this.dobError = ''
      this.mobileNumberError = ''
      this.townError = ''
      this.addressError = ''
      this.homeContactNumberError = ''
      this.error = ''
      this.createError = ''
      if (this.surname.length === 0) {
        this.surnameError = 'Invalid Surname suplied'
        go = false
      }
      if (this.otherNames.length === 0) {
        this.otherNamesError = 'Invalid Othrt Name suplied'
        go = false
      }
      if (this.dob.length === 0) {
        this.dobError = 'Invalid DOB suplied'
        go = false
      }
      if (this.address.length === 0) {
        this.addressError = 'Invalid Address suplied'
        go = false
      }
      if (this.mobileNumber.length === 0) {
        this.mobileNumberError = 'Invalid Mobile Number suplied'
        go = false
      }
      if (this.town.length === 0) {
        this.townError = 'Invalid Town suplied'
        go = false
      }
      if (this.homeContactNumber.length === 0) {
        this.homeContactNumberError = 'Invalid Home Contact suplied'
        go = false
      }
      if (go) {
        this.formError = false
        try {
          const response = await Functions.AddParents({
            surname: this.surname,
            otherNames: this.otherNames,
            dob: this.dob,
            town: this.town,
            address: this.address,
            mobileNumber: this.mobileNumber,
            homeContactNumber: this.homeContactNumber
          })
          console.log(response)
          this.$emit('reRunNumbers', true)
          var parentId = response.data.parentDetails._id
          console.log(parentId)
          this.timeOut()
          this.createSuccess = response.data.success
          this.surname = ''
          this.otherNames = ''
          this.dob = ''
          this.address = ''
          this.mobileNumber = ''
          this.town = ''
          this.address = ''
          this.homeContactNumber = ''
        } catch (error) {
          this.error = error.response.data.error
          this.createError = error.response.data.error_parentError
          this.timeOut()
        }
      } else {
        this.timeOut()
        this.formError = true
      }
    },
    async AddParentAndNav (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch2 = true
      var go = true
      this.formError = false
      this.createSuccess = ''
      this.surnameError = ''
      this.otherNamesError = ''
      this.dobError = ''
      this.mobileNumberError = ''
      this.townError = ''
      this.addressError = ''
      this.homeContactNumberError = ''
      if (this.surname.length === 0) {
        this.surnameError = 'Invalid Surname suplied'
        go = false
      }
      if (this.otherNames.length === 0) {
        this.otherNamesError = 'Invalid Othrt Name suplied'
        go = false
      }
      if (this.dob.length === 0) {
        this.dobError = 'Invalid DOB suplied'
        go = false
      }
      if (this.address.length === 0) {
        this.addressError = 'Invalid Address suplied'
        go = false
      }
      if (this.mobileNumber.length === 0) {
        this.mobileNumberError = 'Invalid Mobile Number suplied'
        go = false
      }
      if (this.town.length === 0) {
        this.townError = 'Invalid Town suplied'
        go = false
      }
      if (this.homeContactNumber.length === 0) {
        this.homeContactNumberError = 'Invalid Home Contact suplied'
        go = false
      }
      if (go) {
        this.formError = false
        try {
          const response = await Functions.AddParents({
            surname: this.surname,
            otherNames: this.otherNames,
            dob: this.dob,
            town: this.town,
            address: this.address,
            mobileNumber: this.mobileNumber,
            homeContactNumber: this.homeContactNumber
          })
          console.log(response)
          this.$emit('reRunNumbers', true)
          this.timeOut2()
          this.createSuccess = response.data.success
          this.surname = ''
          this.otherNames = ''
          this.dob = ''
          this.address = ''
          this.mobileNumber = ''
          this.town = ''
          this.address = ''
          this.homeContactNumber = ''
          setTimeout(() => {
            this.$router.push({name: 'AddChildren'})
          }, 2000)
          demoStorage.setItem('useParentAdd', 'yes')
          demoStorage.setItem('parentAddress',
          response.data.parentDetails.address)
          demoStorage.setItem('parentID', response.data.parentDetails._id)
        } catch (error) {
          this.error = error.response.data.error
          this.createError = error.response.data.error_parentError
          this.timeOut2()
        }
      } else {
        this.timeOut2()
        this.formError = true
      }
    },
    hideSuccess () {
      if (this.createSuccess) {
        setTimeout(() => {
          this.createSuccess = false
          this.fadeClass = true
        }, 3500)
      }
    }
  },
  updated () {
    this.hideSuccess()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  form {
    padding-bottom: 5px;
  }
  button {
    padding-bottom: 5px;
  }
  @media only screen and (max-width: 600px) {

  }

  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
    
<template>
  <div class="content">
    <h2>Add Children <i class="fa fa-plus small"></i></h2>
    <hr>
    <div class="alert alert-danger animated slideInRight" v-if="formError">
        <p v-if="surnameError">{{surnameError}}</p> 
        <p v-if="otherNamesError">{{otherNamesError}}</p> 
        <p v-if="dobError">{{dobError}}</p>
        <p v-if="parentError">{{parentError}}</p>
        <p v-if="addressError">{{addressError}}</p>
        <p v-if="bloodGroupError">{{bloodGroupError}}</p>
        <p v-if="genotypeError">{{genotypeError}}</p>
    </div>

    <div class="alert alert-success animated slideInRight" v-if="createSuccess">
        <p>{{createSuccess}}</p> 
    </div>

    <form role="form">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group" :class="{hasError: surnameError}">
            <label class = "control-label">Surname</label>
            <input class="form-control" v-model="surname">
            
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group" :class="{hasError: otherNamesError}">
            <label class = "control-label">Other Names</label>
            <input class="form-control" v-model="otherNames">
            
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group" :class="{hasError: dobError}">
            <label class = "control-label">DOB</label>
            <input class="form-control" type="date" v-model="dob">
            
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group" :class="{hasError: parentError}">
            <label class = "control-label">Choose Parent  <span v-if="!availParentLenght"> - None Available</span>
            </label>
            <template v-if="rechoseDiable">
              <select class="form-control" v-model="parent" v-if="availParentLenght" disabled>
                <template v-for="(guy, index, key) in availParent">
                  <option :key="key" :value="guy._id">
                    {{guy.surname + " " + guy.otherNames}} -- {{guy.mobileNo1}} 
                  </option>
                </template>
              </select>
              <div v-else>
                <button class="btn btn-primary btn-lg btn-block" @click="loadAddParents"> <i class="fa fa-fw fa-plus"></i> Add Parents</button>
              </div>
            </template>
            <template v-else>
              <select class="form-control" v-model="parent" v-if="availParentLenght">
                <template v-for="(guy, index, key) in availParent">
                  <option :key="key" :value="guy._id">
                    {{guy.surname + " " + guy.otherNames}} -- {{guy.mobileNo1}} 
                  </option>
                </template>
              </select>
              <div v-else>
                <button class="btn btn-primary btn-lg btn-block" @click="loadAddParents"> <i class="fa fa-fw fa-plus"></i> Add Parents</button>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="form-group" v-if="showAddressChooser">
        <label>Same Address</label>
        <div class="radio">
          <label>
              <input type="radio" value="yes" v-model="sameAddress">Yes
          </label>
        </div>
        <div class="radio">
          <label>
              <input type="radio" value="no" v-model="sameAddress">No
          </label>
        </div>
      </div>
      <div class="form-group" :class="{hasError: addressError}" v-if="showAddressInput">
        <label class = "control-label">Address</label>
        <textarea class="form-control" rows="5" v-model="address"></textarea>
        
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group" :class="{hasError: bloodGroupError}">
            <label class = "control-label">Blood Group</label>
            <input class="form-control" v-model="bloodGroup">
            
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group" :class="{hasError: genotypeError}">
            <label class = "control-label">Genotype</label>
            <input class="form-control" v-model="genotype">
            
          </div>
        </div>
      </div>
      <div class="row">
        
        <div class="col-md-8">
          <button type="button" class="btn btn-primary btn-lg btn-block btn-success" @click="AddChildren" :class="{disabled: btnDisabled}">
            <div class="loader" v-if="loaderSwitch"></div>
            <span v-else>Proceed to save Children</span>
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
import {LoaderMixin} from '../mixins/LoaderMixin'
import Functions from '../services/Functions'
import {DataMixin} from '../mixins/DataMixin'
import DataFunctions from '../services/DataFunctions'

export default {
  name: 'AddChildren',
  mixins: [LoaderMixin, DataMixin],
  data: () => ({
    msg: 'Welcome to AddChildren Component!',
    surname: '',
    otherNames: '',
    dob: '',
    sameAddress: 'yes',
    address: '',
    bloodGroup: '',
    genotype: '',
    surnameError:'',
    otherNamesError: '',
    addressError: '',
    bloodGroupError: '',
    genotypeError: '',
    error: '',
    createSuccess: '',
    createError: '',
    dobError: '',
    parent: '',
    parentError: '',
    formError: '',
    showAddressInput: true,
    showAddressChooser: false,
    availParent: [],
    availParentLenght: 0,
    rechoseDiable: false
  }),
  methods: {
    cancelAll (e) {
      e.preventDefault()
      this.surname = ''
      this.surnameError = ''
      this.otherNames = ''
      this.otherNamesError = ''
      this.address = ''
      this.addressError = ''
      this.bloodGroup = ''
      this.bloodGroupError = ''
      this.dob = ''
      this.dobError = ''
      this.genotypeError = ''
      this.genotype = ''
      this.parent = ''
      this.parentError = ''
      this.formError = false
      this.rechoseDiable = false
    },
    async AddChildren (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      this.formError = false
      this.error = ''
      this.surnameError =''
      this.otherNamesError = ''
      this.dobError = ''
      this.addressError = ''
      this.bloodGroupError = ''
      this.genotypeError = ''
      this.parentError = ''
      if (this.surname.length === 0) {
        this.surnameError = 'Invalid Surname suplied'
        go = false
      }
      if (this.otherNames.length === 0) {
        this.otherNamesError = 'Invalid Other Name suplied'
        go = false
      }
      if (this.dob.length === 0) {
        this.dobError = 'Invalid DOB suplied'
        go = false
      }
      if (this.parent.length === 0) {
        this.parentError = 'Invalid Parent suplied'
        go = false
      }
      if (this.genotype.length === 0) {
        this.genotypeError = 'Invalid Genotype suplied'
        go = false
      }
      if (this.bloodGroup.length === 0) {
        this.bloodGroupError = 'Invalid Blood Group suplied'
        go = false
      }
      if (this.address.length === 0) {
        this.addressError = 'Invalid Address suplied'
        go = false
      }
      if (this.parent.length === 0) {
        this.parentError = 'Invalid Parent suplied'
        go = false
      }
      if(go) {
        this.formError = false
        try {
          const response = await Functions.AddChild({
            surname: this.surname,
            otherNames: this.otherNames,
            dob: this.dob,
            address: this.address,
            parentID: this.parent,
            genotype: this.genotype,
            bloodGroup: this.bloodGroup
          })
          console.log(response)
          this.$emit('reRunNumbers', true)
          this.timeOut()
          this.createSuccess = response.data.success
          this.rechoseDiable = false
          this.surname = ''
          this.otherNames = ''
          this.dob = ''
          this.address = ''
          this.bloodGroup = ''
          this.genotype = ''
          this.parent = ''
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        this.timeOut()
        this.formError = true
      }
    },
    sameAddressCheck () {
      var getValue = localStorage.getItem('useParentAdd')
      if (getValue === 'yes') {
        this.sameAddress = 'yes'
        this.showAddressChooser = true
      } else {
        this.sameAddress = 'no'
      }
    },
    clearLocal () {
      localStorage.setItem('useParentAdd', 'no')
      localStorage.setItem('parentAddress', '')
      localStorage.setItem('parentID', '')
    },
    confirmAddAndFixIn () {
      if (this.sameAddress === 'yes') {
      this.showAddressInput = false
      var parentAdd = localStorage.getItem('parentAddress')
      this.address = parentAdd
      } else if (this.sameAddress === 'no') {
        this.showAddressInput = true
        // this.address = ''
      }
    },
    async getParent () {
      try {
        var response = await DataFunctions.getParent()
        this.availParent = response.data.data
        this.availParentLenght  = this.availParent.length
      } catch (error) {
        console.log(error.response.data)
      }
    },
    loadAddParents (e) {
      e.preventDefault()
      this.$router.push({name: 'AddParents'})
    },
    autoChoseParent () {
      var check = localStorage.getItem('parentID')
      if (check.length) {
        this.parent = check
        this.rechoseDiable = true 
      }
    }
  },
  mounted () {
    this.sameAddressCheck()
    this.getParent()
    this.autoChoseParent()
  },
  beforeDestroy () {
    this.clearLocal()
  },
  updated () {
    this.confirmAddAndFixIn()
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
    
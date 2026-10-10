<template>
  <div class="content">
    <h2>Add Immunization <i class="fa fa-plus small"></i></h2>
    <hr>
    <div class="alert alert-danger animated slideInRight" v-if="formError">
      <p v-if="titleError">{{titleError}}</p> 
      <p v-if="typeError">{{typeError}}</p> 
      <p v-if="doseError">{{doseError}}</p>
      <p v-if="descError">{{descError}}</p>
    </div>

    <div class="alert alert-success animated slideInRight" v-if="createSuccess">
      <p>{{createSuccess}}</p> 
    </div>

    <form role="form">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group" :class="{hasError: titleError}">
            <label class = "control-label">Title</label>
            <input class="form-control" v-model="title">
            
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group" :class="{hasError: typeError}">
            <label class = "control-label">Chose Type</label>
            <select class="form-control" v-model="type">
                
                <option value="Live Virus">Live Virus</option>
                <option value="Killed Vaccines">Killed Vaccines</option>
                <option value="Toxoid Vaccines">Toxoid Vaccines</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group" :class="{hasError: doseError}">
            <label class = "control-label">Dose</label>
            <select class="form-control" v-model="dose">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-group" :class="{hasError: descError}">
        <label class = "control-label">Description</label>
        <textarea class="form-control" rows="5" v-model="desc"></textarea>
        
      </div>
      <div class="form-group">
        <label class = "control-label">Additional Note</label>
        <textarea class="form-control" rows="5" v-model="notes"></textarea>
        
      </div>
      <div class="row">
        <div class="col-md-12">
          <button type="button" class="btn btn-primary btn-lg btn-block btn-success addBtn" :class="{disabled: btnDisabled}" @click="AddImmu">
            <div class="loader" v-if="loaderSwitch"></div>
            <span v-else>Add Immunization</span>
          </button>
        </div>

        <div class="col-md-12">
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

export default {
  name: 'AddImmunization',
  mixins: [LoaderMixin],
  data: () => ({
    msg: 'Welcome to AddImmunization Component!',
    title: '',
    type: '',
    dose: '',
    desc: '',
    notes: '',
    btnDisabled: false,
    titleError: '',
    typeError: '',
    doseError: '',
    descError: '',
    error: '',
    formError: false,
    createSuccess: ''
  }),
  methods: {
    cancelAll (e) {
      e.preventDefault()
      this.title = ''
      this.type= ''
      this.dose = ''
      this.desc = ''
      this.notes = ''
      this.titleError = ''
      this.typeError= ''
      this.doseError = ''
      this.descError = ''
      this.error = ''
      this.formError = false
    },
    async AddImmu (e) {
      e.preventDefault()
      this.btnDisabled = true
      this.loaderSwitch = true
      var go = true
      this.titleError = ''
      this.typeError = ''
      this.doseError = ''
      this.descError = ''
      this.formError = false
      this.createSuccess = ''
      if (this.title.length === 0) {
        this.titleError = 'Invalid Title suplied'
        go = false
      }
      if (this.type.length === 0) {
        this.typeError = 'Invalid Type suplied'
        go = false
      }
      if (this.dose.length === 0) {
        this.doseError = 'Invalid Dose suplied'
        go = false
      }
      if (this.desc.length === 0) {
        this.descError = 'Invalid Description suplied'
        go = false
      }
      if (go) {
        this.formError = false
        try {
          const response = await Functions.AddImmu({
            title: this.title,
            type: this.type,
            desc: this.desc,
            dose: this.dose,
            note: this.notes
          })
          console.log(response)
          this.$emit('reRunNumbers', true)
          this.timeOut()
          this.createSuccess = response.data.success
          this.title = ''
          this.type= ''
          this.dose = ''
          this.desc = ''
          this.notes = ''
        } catch (error) {
          this.error = error.response.data.error
        }
      } else {
        this.timeOut()
        this.formError = true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .addBtn {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  @media only screen and (max-width: 600px) {

  }

  @media only screen and (min-width: 600px) and (max-width: 992px) {

  }
  @media only screen and (min-width: 993px) {

  }
</style>
    
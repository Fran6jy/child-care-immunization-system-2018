import DataFunctions from '../services/DataFunctions'

export const DataMixin = {
  data: () => ({
    parent: [],
    children: [],
    parentNo: '',
    childNo: '',
    immuNo: '',
    activeImmuNo: '',
    immu: []
  }),
  methods: {
    async getChildNo () {
      try {
        var response = await DataFunctions.getChildNo()
        this.childNo = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getParentNo () {
      try {
        var response = await DataFunctions.getParentNo()
        this.parentNo = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getImmunizationNo () {
      try {
        var response = await DataFunctions.getImmunizationNo()
        this.immuNo = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getActiveImmunizationNo () {
      try {
        var response = await DataFunctions.getActiveImmunizationNo()
        this.activeImmuNo = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getChild () {
      try {
        var response = await DataFunctions.getChild()
        this.children = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getParent () {
      try {
        var response = await DataFunctions.getParent()
        this.parent = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    },
    async getImmunization () {
      try {
        var response = await DataFunctions.getImmunization()
        this.immu = response.data.data
      } catch (error) {
        console.log(error.response.data)
      }
    }
  }
}

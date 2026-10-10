import Api from './Api'

export default {
  getChildNo () {
    return Api().get('getchildno')
  },
  getParentNo () {
    return Api().get('getparentno')
  },
  getImmunizationNo () {
    return Api().get('getimmuno')
  },
  getActiveImmunizationNo () {
    return Api().get('getactiveimmuno')
  },
  getChild () {
    return Api().get('getchild')
  },
  getParent () {
    return Api().get('getparent')
  },
  getImmunization () {
    return Api().get('getimmu')
  }
}

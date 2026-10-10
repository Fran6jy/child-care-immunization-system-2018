import Api from './Api'

export default {
  AddParents (credentials) {
    return Api().post('addparents', credentials)
  },
  AddImmu (credentials) {
    return Api().post('addimmu', credentials)
  },
  AddChild (credentials) {
    return Api().post('addchild', credentials)
  },
  linkImmu (credentials) {
    return Api().post('linkimmu', credentials)
  },
}

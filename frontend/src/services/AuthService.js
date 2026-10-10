import Api from './Api'

export default {
  AdminLogin (credentials) {
    return Api().post('adminlogin', credentials)
  },
  AdminPassUpdate (credentials) {
    return Api().post('adminpassupdate', credentials)
  }
}

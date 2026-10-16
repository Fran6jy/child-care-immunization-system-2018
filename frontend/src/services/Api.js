import axios from 'axios'
import store from '@/store/store'
import DemoApi from './DemoApi'

export default () => {
  if (process.env.DEMO_MODE === 'true') return DemoApi()
  return axios.create({
    baseURL: process.env.PORT ? '' : 'http://localhost:3001/api/',
    headers: {'x-auth': store.state.token}
  })
}

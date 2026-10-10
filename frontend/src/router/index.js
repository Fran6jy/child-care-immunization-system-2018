import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/pages/Login"
import Dashboard from '@/pages/Dashboard'
// import RecentImmu from '@/components/RecentImmu'
import AddChildren from '@/components/AddChildren'
import AddImmunization from '@/components/AddImmunization'
import AddParents from '@/components/AddParents'
import Settings from '@/pages/Settings'
import UserProfile from '@/pages/UserProfile'
import ManageParents from '@/components/ManageParents.vue'
import ManageImmu from '@/components/ManageImmu.vue' 
import ManageChildren from '@/components/ManageChildren.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: '/dashboard',
      // name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'UserProfile',
          component: UserProfile
        },
        {
          path: '/add-parents',
          name: 'AddParents',
          component: AddParents
        },
        {
          path: '/add-children',
          name: 'AddChildren',
          component: AddChildren
        },
        {
          path: '/add-immunization',
          name: 'AddImmunization',
          component: AddImmunization
        },
        {
          path: '/settings',
          name: 'Settings',
          component: Settings
        },
        {
          path: '/manage-parents',
          name: 'ManageParents',
          component: ManageParents
        },
        {
          path: '/manage-children',
          name: 'ManageChildren',
          component: ManageChildren
        },
        {
          path: '/manage-immunization',
          name: 'ManageImmu',
          component: ManageImmu
        }
      ]
    }
  ]
});

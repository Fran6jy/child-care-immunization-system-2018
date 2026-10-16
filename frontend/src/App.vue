<template>
  <div id="app">
    <div class="archive-banner" v-if="isDemo">2018 ARCHIVE DEMO · Fictional data only · Changes reset on refresh · Do not enter real patient information</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () { return { isDemo: process.env.DEMO_MODE === 'true' } },
  created () {
    if (this.isDemo) {
      ['useParentAdd', 'parentAddress', 'parentID'].forEach(key => sessionStorage.removeItem(key))
    }
  }
}
</script>

<style>
.archive-banner { background: #173d48; color: white; text-align: center; padding: 10px 16px; font-size: 14px; font-weight: 600; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

  
}
</style>

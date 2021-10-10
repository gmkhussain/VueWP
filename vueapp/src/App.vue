<template>
  <div>
      <Header />
      <router-view />
  </div>
</template>

<script>
import Header from './views/frontend/layouts/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
        "links": {
          "home": '/',
          "contact": '/contact'
        }
    }
  }
}
</script>

<style>
/* No Style */
</style>

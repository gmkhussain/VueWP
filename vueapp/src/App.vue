<template>
  <div>
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from './views/frontend/layouts/AppLayout'

export default {
  name: 'App',
  components: {
    AppLayout
  },
  data() {
    return {
        "pageData": "App"
    }
  }
}
</script>

<style>
/* No Style */
html {
  filter: invert(1);
}
</style>

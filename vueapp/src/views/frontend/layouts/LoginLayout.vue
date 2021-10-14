<template>
  <div id="body-wrapper">
      <main id="pageContent">
        <slot />
      </main>
  </div>
</template>

<script>

export default{
  name: 'LoginLayout',
  components: {
    // Layout without Header & Footer
  }
}
</script>
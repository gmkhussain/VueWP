<template>
  <div id="body-wrapper">
    <Header />
      <main id="pageContent">
        <slot />
      </main>
    <Footer />
  </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'

export default{
  name: 'AppLayoutDefault',
  components: {
    Header,
    Footer
  }
}
</script>
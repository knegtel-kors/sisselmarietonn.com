<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>
<script>
import Header from '~/components/Header'

export default {
  components: {
    Header
  }
}
</script>
<style>

html {
  scroll-behavior: smooth;
}

body {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

img {
  width: 100%;
}
</style>

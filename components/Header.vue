<template>
  <header>
    <div class="logo">
      <nuxt-link to="/">
        <h2>Sissel Marie Tonn</h2>
      </nuxt-link>
      <div class="line"></div>
      <SquiglyLine />
    </div>

    <nav>
      <nuxt-link class="nav-link" to="/project">projects</nuxt-link>
      <nuxt-link class="nav-link" to="/about">About</nuxt-link>
      <nuxt-link class="nav-link" to="/illustration">illustration</nuxt-link>
      <nuxt-link class="nav-link" to="/co-learning">co-learning</nuxt-link>
    </nav>
  </header>
</template>

<script>
import SquiglyLine from '~/components/SquiglyLine'

export default {
  components: {
    SquiglyLine
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/blocks/BlockHeader.scss';
</style>

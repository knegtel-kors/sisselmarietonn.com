<template>
  <header v-bind:class="{ open: menuToggle }">
    <div class="headerWrapper">
      <nuxt-link to="/" ref="logo">
        <h2>Sissel Marie Tonn</h2>
      </nuxt-link>
      <SquiglyLine class="line" />
    </div>

    <nav>
      <nuxt-link
        class="nav-link"
        v-on:click.native="closeMenu()"
        :to="'/project'"
        >projects</nuxt-link
      >
      <nuxt-link class="nav-link" v-on:click.native="closeMenu()" :to="'/about'"
        >About</nuxt-link
      >
      <nuxt-link
        class="nav-link"
        v-on:click.native="closeMenu()"
        :to="'/illustration'"
        >illustration</nuxt-link
      >
      <nuxt-link
        class="nav-link"
        v-on:click.native="closeMenu()"
        :to="'/co-learning'"
        >co-learning</nuxt-link
      >
    </nav>
    <img
      v-if="!menuToggle"
      class="nav-btn"
      src="~/assets/img/menu-open.svg"
      alt="Open mobile menu"
      v-on:click="toggleMenu()"
    />
    <img
      v-else
      class="nav-btn"
      src="~/assets/img/menu-close.svg"
      alt="Close mobile menu"
      v-on:click="toggleMenu()"
    />
  </header>
</template>

<script>
import SquiglyLine from '~/components/SquiglyLine'

export default {
  components: {
    SquiglyLine,
  },
  data() {
    return {
      menuToggle: true,
    }
  },
  beforeMount() {
    this.menuToggle = false
  },
  methods: {
    toggleMenu() {
      this.menuToggle = !this.menuToggle
    },
    closeMenu() {
      this.menuToggle = false
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/blocks/BlockHeader.scss';
</style>

<template>
  <header v-bind:class="{ open: menuToggle }">
    <div class="headerWrapper">
      <nuxt-link to="/" ref="logo">
        <h2>Studio SENTINEL</h2>
      </nuxt-link>
      <client-only>
        <!-- this component will only be rendered on client-side -->
        <SquiglyLine class="line" />
      </client-only>
    </div>

    <nav>
      <nuxt-link class="nav-link" v-on:click.native="closeMenu()" to="/about"
        >About</nuxt-link
      >
      <nuxt-link class="nav-link" v-on:click.native="closeMenu()" to="/project"
        >Projects</nuxt-link
      >

      >
      <nuxt-link
        class="nav-link"
        v-on:click.native="closeMenu()"
        to="/co-learning"
        >Co-learning</nuxt-link
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

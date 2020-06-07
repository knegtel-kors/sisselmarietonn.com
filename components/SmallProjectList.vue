<template>
  <div class="project-wrapper small">
    <div class="block-project" v-for="project in projects" :key="project.id">
      <!-- Image -->
      <FormattedImage class="project-img" :field="project.data.header" :width="400" :height="300" />
      <div class="project-info">
        <!-- Title -->
        <nuxt-link class="project" :to="project.slugs[0]">
          <prismic-rich-text :field="project.data.title" />
        </nuxt-link>
        <div class="project-data">
          <!-- Date -->
          <DateFormatter class="dateline" :data="project.data" />
          <!-- Project Type -->
          <span class="type">
            {{ project.data.type }}
          </span>
          <!-- View Project -->
          <nuxt-link class="view-project" :to="link(project)">
            <span>View</span>
            <img src="~/assets/img/smt-arrow.png" alt="">
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- FAKE LINK - REPLACE WITH ACTUAL LINK -->
    <a href="#" class="view-category">
      All Projects
      <img src="~/assets/img/smt-arrow.png" alt="">
    </a>
  </div>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js"
import textBalancer from 'text-balancer'
import FormattedImage from '~/components/FormattedImage'
import DateFormatter from '~/components/DateFormatter'

export default {
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  components: {
    DateFormatter,
    FormattedImage
  },
  mounted() {
    textBalancer.balanceText()
  },
  methods: {
    link(project) {
      return LinkResolver(project)
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/styles/blocks/BlockProjectSmall.scss";
</style>

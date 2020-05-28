<template>
  <div class="big-projects">
    <div class="big-project" v-for="project in projects" :key="project.id">
        <prismic-rich-text :field="project.data.title" />
      <FormattedImage :field="project.data.header" :width="800" :height="600" />

      <div class="type">
        {{ project.data.type }}
      </div>
      <DateFormatter :data="project.data" />

      <nuxt-link class="project" :to="link(project)">
        View ->
      </nuxt-link>
    </div>
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

<style lang="scss"></style>

<template>
  <div class="small-projects">
    <div class="small-project" v-for="project in projects" :key="project.id">

      <nuxt-link class="project" :to="project.slugs[0]">
        <prismic-rich-text :field="project.data.title" />
      </nuxt-link>

      <FormattedImage :field="project.data.header" :width="200" :height="400" />

      <div class="type">
        {{ project.data.type }}
      </div>

      <DateFormatter :data="project.data" />
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="scss"></style>

<template>
  <div class="big-projects">
    <div class="big-project" v-for="project in projects" :key="project.id">
        <prismic-rich-text :field="project.data.title" />
      <FormattedImage :field="project.data.header" :width="800" :height="600" />

      <div class="type">
        {{ project.data.type }}
      </div>
      <DateFormatter :data="project.data" />

      {{project}}

      <nuxt-link class="project" :to="project.slugs[0]">
        View ->
      </nuxt-link>
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

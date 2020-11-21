<template>
  <div class="project-wrapper small">
    <nuxt-link
      class="block-project"
      v-for="(project, index) in projects"
      :key="project.id + index"
      :to="link(project)"
    >
      <!-- Image -->
      <FormattedImage
        v-if="project.data.header"
        class="project-img"
        :field="project.data.header"
        :width="400"
        :height="300"
      />
      <div class="project-info">
        <!-- Title -->
        <prismic-rich-text :field="project.data.title" />
        <div class="project-data">
          <!-- Date -->
          <DateFormatter class="dateline" :data="project.data" />
          <!-- Project Type -->
          <span class="type">
            {{ project.data.type }}
          </span>
          <!-- View Project -->
          <div class="view-project">
            <span>View</span>
            <img src="~/assets/img/smt-arrow.svg" alt="" />
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import LinkResolver from '~/plugins/link-resolver.js'
import textBalancer from 'text-balancer'
import FormattedImage from '~/components/FormattedImage'
import DateFormatter from '~/components/DateFormatter'

export default {
  props: {
    projects: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  components: {
    DateFormatter,
    FormattedImage,
  },
  mounted() {
    textBalancer.balanceText()
  },
  methods: {
    link(project) {
      return LinkResolver(project)
    },
  },
}
</script>


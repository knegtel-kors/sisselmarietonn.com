<template>
  <div class="project-wrapper overview">
    <nuxt-link
      class="block-project"
      v-for="project in projects"
      :key="project.id"
      :to="link(project)"
    >
      <!-- Image -->
      <FormattedImage
        v-if="HeaderImage(project)"
        class="project-img"
        :field="HeaderImage(project)"
        :width="400"
        :height="300"
      />
      <FormattedImage
        v-if="GalleryImage(project)"
        class="project-img"
        :field="GalleryImage(project)"
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
import get from 'lodash.get'
import head from 'lodash.head'

export default {
  props: {
    projects: {
      type: Array,
      required: true
    },
    type: {
      type: String,
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
    },
    plural(type) {
      if (type === 'project') return 'projects'
      if (type === 'illustration') return 'projects'
      if (type === 'co-learning') return 'projects'

      return type
    },
    HeaderImage(project) {
      return get(project, ['data', 'header'])
    },
    GalleryImage(project) {
      const firstSlide = head(get(project, ['data', 'header_gallery']))
      return get(firstSlide, ['image'])
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/blocks/BlockProjectSmall.scss';
</style>

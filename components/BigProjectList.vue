<template>
  <div class="project-wrapper large">
    <div class="block-project" v-for="project in projects" :key="project.id">
      <FormattedImage
        class="project-img"
        :field="project.data.header"
        :width="800"
        :height="600"
      />
      <div class="block-content">
        <div class="project-info">
          <!-- Title -->
          <nuxt-link class="view-project" :to="link(project)">
            <prismic-rich-text :field="project.data.title" />
          </nuxt-link>
          <div class="project-data">
            <!-- Date -->
            <DateFormatter class="dateline" :data="project.data" />
            <!-- Project Type -->
            <span class="type">{{ project.data.type }}</span>
            <!-- View Project -->
            <nuxt-link class="view-project" :to="link(project)">
              <span>View</span>
              <img src="~/assets/img/smt-arrow.svg" alt />
            </nuxt-link>
          </div>
          <div v-if="getDescription(project)" class="project-description">
            {{ getDescription(project) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinkResolver from '~/plugins/link-resolver.js'
import textBalancer from 'text-balancer'
import get from 'lodash.get'
import find from 'lodash.find'
import stripHtml from 'string-strip-html'
import FormattedImage from '~/components/FormattedImage'
import DateFormatter from '~/components/DateFormatter'

export default {
  data() {
    return {
      obj: {
        key: 'value'
      }
    }
  },
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

    const obj = {
      key: 'value'
    }

    const data = get(obj, 'key')
  },
  methods: {
    link(project) {
      return LinkResolver(project)
    },
    getDescription(project) {
      // Get both description and reseach content
      const description = get(project, ['data', 'description'])
      const research = get(project, ['data', 'research'])
      // set text as either description or research
      const text = this.getText(description) || this.getText(research)

      // if we have text
      if (text) {
        // render prismic slice as html
        // then strip html so we have a flat paragraph
        return stripHtml(this.$prismic.asHtml(text.primary.text))
      }

      // if we can't find any test return false
      // so we don't render the whole div
      return false
    },
    getText(slices) {
      return find(slices, slice => slice.slice_type === 'text')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/blocks/BlockProjectLarge.scss';
</style>

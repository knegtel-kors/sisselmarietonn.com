<template>
  <div class="project-wrapper large">
    <div class="block-project" v-for="project in projects" :key="project.id">
      {{ getDescription(project) }}
      <FormattedImage
        class="project-img"
        :field="project.data.header"
        :width="800"
        :height="600"
      />
      <div class="block-content">
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
            <nuxt-link class="view-project" :to="link(project)">
              <span>View</span>
              <img src="~/assets/img/smt-arrow.png" alt="" />
            </nuxt-link>
          </div>
          <!-- THIS IS FAKE TEXT - NEEDS ACTUAL DATA -->
          <div class="project-description">
            <p>
              For the last 32 years the north of The Netherlands has experienced
              man-made earthquakes due to gas extraction in the largest field
              for natural gas in Europe, the Groningen Gas Field. The work The
              Intimate Earthquake Archive, brings together research done by
              artist Sissel Marie Tonn with two different modes of ‘storing’
              information of man-made earthquakes: The seismic activity of the
              earthquakes as meticulously recorded and annotated in the immense
              digital data bank of the Dutch Meteorological Institute (KNMI);
              and the personal stories of people living in Groningen, who can
              provide precise descriptions of feeling this seismic activity
              passing through their bodies to anyone willing to listen. Some of
              the people living with these man-made earthquakes even claim to
              wake up in their beds, before they feel the tremors across the
              earth.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinkResolver from '~/plugins/link-resolver.js'
import textBalancer from 'text-balancer'
import FormattedImage from '~/components/FormattedImage'
import DateFormatter from '~/components/DateFormatter'
import get from 'lodash.get'

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
      return get(project, 'data')
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/styles/blocks/BlockProjectLarge.scss';
</style>

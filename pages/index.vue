<template>
  <article>
    <div class="project-wrapper large">
      <div v-for="(slice, index) in homepage" :key="index">
        <BigProject
          v-if="slice.type === 'big_article'"
          v-bind:class="{ odd: slice.version }"
          :project="slice.data"
        />
        <SmallProjectList
          v-if="slice.type === 'list_of_articles1'"
          :projects="slice.data"
          type="project"
        />
      </div>
    </div>
  </article>
</template>

<script>
import BigProject from '~/components/BigProject'
import SmallProjectList from '~/components/SmallProjectList'

export default {
  components: {
    BigProject,
    SmallProjectList,
  },
  head() {
    return {
      title: `Studio SENTINEL`,
    }
  },
  async asyncData({ $prismic, error }) {
    try {
      // Query to get API object
      // this should be modified to get the correct articles
      const homepage = await $prismic.api.getSingle('homepage')
      let numBigProject = 0
      const projects = homepage.data.body.map(async (slice) => {
        if (slice.slice_type === 'big_article') {
          const id = slice.primary.article.id
          const version = numBigProject % 2
          numBigProject++
          return {
            version,
            type: slice.slice_type,
            data: await $prismic.api.getByID(id),
          }
        }

        if (slice.slice_type === 'list_of_articles1') {
          // filter out all undefined project ids
          const ids = Object.values(slice.primary).filter((sliceArray) => {
            return Boolean(sliceArray.id)
          })
          // use ids to get the content
          const smallartcles = ids.map(
            async (sliceArray) => {
              if (sliceArray.id) {
                return $prismic.api.getByID(sliceArray.id)
              }
            }
          )

          return {
            type: slice.slice_type,
            data: await Promise.all(smallartcles),
          }
        }
      })

      // Returns data to be used in template
      return {
        homepage: await Promise.all(projects),
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Failed to retrieve page, please check if content exists.' })
    }
  },
}
</script>

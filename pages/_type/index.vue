<template>
  <article>
    <Header />

    <p v-if="!overview.results.length">
      no projects found
    </p>

    <div class="list" v-if="overview.results.length">
      <p>
        found {{ overview.total_results_size }} {{ type }}'s in
        {{ pagination.total_pages }} pages
      </p>

      <div class="result" v-for="result in overview.results" :key="result.id">
        <prismic-rich-text :field="result.data.title" />
        <FormattedImage
          :field="result.data.header"
          :width="600"
          :height="400"
        />
        <nuxt-link class="project" :to="link(result)">
          View ->
        </nuxt-link>
      </div>
    </div>

    <div class="pagination">
      <nuxt-link
        v-if="pagination.prev > 0"
        class="prev"
        :to="{ path: type, query: { page: pagination.prev } }"
      >
        previous
      </nuxt-link>

      <div class="numbers">
        <nuxt-link
          v-for="number in pagination.total_pages"
          :key="number"
          class="number"
          :to="{ path: type, query: { page: number } }"
        >
          {{ number }}
        </nuxt-link>
      </div>

      <nuxt-link
        v-if="pagination.next <= pagination.total_pages"
        class="next"
        :to="{ path: type, query: { page: pagination.next } }"
      >
        next
      </nuxt-link>
    </div>
  </article>
</template>

<script>
import LinkResolver from '~/plugins/link-resolver.js'
import textBalancer from 'text-balancer'
import Header from '~/components/Header'
import SmallProjectList from '~/components/SmallProjectList'
import FormattedImage from '~/components/FormattedImage'
import DateFormatter from '~/components/DateFormatter'
import TabContent from '~/components/TabContent'

export default {
  head() {
    return {
      title: `${this.title} by Sissel Marie Tonn`
    }
  },
  data() {
    return { selectedTab: 'description' }
  },
  components: {
    Header,
    SmallProjectList,
    FormattedImage,
    DateFormatter,
    TabContent
  },
  watchQuery: ['page'],
  async asyncData({ $prismic, error, params, query }) {
    try {
      // We need to format is starting with a capital
      console.log(query)
      const currentPage = parseInt(query.page) || 1
      const type = params.type.charAt(0).toUpperCase() + params.type.slice(1)
      const overview = await $prismic.api.query(
        $prismic.predicates.at('my.article.type', type),
        { orderings: '[my.article.date desc]', pageSize: 2, page: currentPage }
      )

      // Returns data to be used in template
      return {
        overview: overview,
        title: type + "'s",
        type: params.type,
        pagination: {
          next: overview.page + 1,
          current: overview.page,
          prev: overview.page - 1,
          total_pages: overview.total_pages
        }
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    link(project) {
      return LinkResolver(project)
    }
  },
  mounted() {
    textBalancer.balanceText()
  },
  filters: {
    onlyYear(val) {
      let date = new Date(val)
      return date.getFullYear()
    }
  }
}
</script>

<style lang="scss">
$bg: #151515;
$pink: #f29a9d;
$blue: #3d87ca;
$blue: #15a09b;
$transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 400ms;

p:first-of-type {
  margin-top: 0;
}

a {
  color: inherit;
}

article {
  padding: 2rem;
}

.pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

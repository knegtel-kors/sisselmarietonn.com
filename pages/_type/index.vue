<template>
  <article>
    <Header />
    <div class="page-content">
      <div class="page-info">
        <p v-if="!overview.results.length">
          No results found
        </p>
      </div>

      <OverviewProjectList :projects="overview.results" :type="type" />
      <Pagination :pagination="pagination" :type="type" />
    </div>
  </article>
</template>

<script>
import LinkResolver from '~/plugins/link-resolver.js'
import textBalancer from 'text-balancer'
import Header from '~/components/Header'
import OverviewProjectList from '~/components/OverviewProjectList'
import Pagination from '~/components/Pagination'
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
    Pagination,
    OverviewProjectList,
    FormattedImage,
    DateFormatter,
    TabContent
  },
  watchQuery: ['page'],
  async asyncData({ $prismic, error, params, query, route, redirect }) {
    try {
      // We need to format is starting with a capital
      const currentPage = parseInt(query.page) || 1
      const type = params.type.charAt(0).toUpperCase() + params.type.slice(1)
      const overview = await $prismic.api.query(
        $prismic.predicates.at('my.article.type', type),
        { orderings: '[my.article.date desc]', pageSize: 10, page: currentPage }
      )
      
      if (currentPage > overview.total_pages) {
        redirect(`${route.path}?page=${overview.total_pages}`);
      }      

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
</style>

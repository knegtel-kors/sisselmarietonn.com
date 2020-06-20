<template>
  <article>
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
import OverviewProjectList from '~/components/OverviewProjectList'
import Pagination from '~/components/Pagination'

export default {
  head() {
    return {
      title: `${this.title} by Sissel Marie Tonn`,
    }
  },
  data() {
    return { selectedTab: 'description' }
  },
  components: {
    Pagination,
    OverviewProjectList,
  },
  watchQuery: ['page'],
  async asyncData({ $prismic, error, params, query, route, redirect }) {
    try {
      const currentPage = parseInt(query.page) || 1
      // We need to format with a capital
      const type = params.type
        .split('-')
        .map((Morpheme) => {
          return Morpheme.charAt(0).toUpperCase() + Morpheme.slice(1)
        })
        .join('-')

      const overview = await $prismic.api.query(
        $prismic.predicates.at('my.article.type', type),
        { orderings: '[my.article.date desc]', pageSize: 12, page: currentPage }
      )

      if (currentPage > overview.total_pages) {
        redirect(`${route.path}?page=${overview.total_pages}`)
      }

      // Returns data to be used in template
      return {
        overview: overview,
        title: type + "s",
        type: params.type,
        pagination: {
          next: overview.page + 1,
          current: overview.page,
          prev: overview.page - 1,
          total_pages: overview.total_pages,
        },
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
    },
    toType(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>

<style lang="scss"></style>

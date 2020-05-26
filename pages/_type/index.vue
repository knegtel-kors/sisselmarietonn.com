<template>
  <article>
    <Header />

    <div class="list">
      <div class="result" v-for="result in overview.results" :key="result.id">
        <prismic-rich-text :field="result.data.title" />
      </div>
    </div>
  </article>
</template>

<script>
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
  async asyncData({ $prismic, error, params }) {
    try {
      // We need to format is starting with a capital
      const type = params.type.charAt(0).toUpperCase() + params.type.slice(1)
      const overview = await $prismic.api.query(
        $prismic.predicates.at('my.article.type', type),
        { orderings: '[my.article.date desc]', pageSize: 50 }
      )

      console.log(overview)
      // Returns data to be used in template
      return {
        overview: overview,
        title: type + "'s"
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {},
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
</style>

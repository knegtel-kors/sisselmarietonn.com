<template>
  <article>
    <h1>article</h1>
  </article>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import moment from 'moment'
import textBalancer from 'text-balancer'
import FormattedImage from '~/components/FormattedImage'

export default {
  data() {
    return {
      percentage: 0
    }
  },
  components: {
    FormattedImage
  },
  directives: {
    dragscroll
  },
  async asyncData({ $prismic, error, params }) {
    try {
      console.log(params.article)
      const article = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'article'),
        { pageSize: 50 }
      )

      // Returns data to be used in template
      return {
        article: article.results
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
  text-decoration: none;
}

article {
  padding: 2rem;
}
</style>

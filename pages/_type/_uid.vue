<template>
  <article>
    <Header />
    <prismic-rich-text :field="article.title" />
    <FormattedImage :field="article.header" :width="800" :height="600" />
    <DateFormatter :data="article" />
    <prismic-rich-text :field="article.credits" />
    <TabContent :data="article" />
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
      const article = await $prismic.api.getByUID('article', params.uid)
      // Returns data to be used in template
      return {
        article: article.data,
        title: article.data.title[0].text
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
</style>

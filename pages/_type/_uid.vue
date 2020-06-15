<template>
  <article>
    <Header />
    <div class="article-wrapper">
      <div class="article-header">
        <prismic-rich-text :field="article.title" />
        <DateFormatter :data="article" />
      </div>
      <FormattedImage :field="article.header" :width="1200" :height="800" />
      <prismic-rich-text class="header-caption" :field="article.credits" />
      <TabContent :data="article" />
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
@import '~/assets/styles/blocks/BlockArticle.scss';
@import '~/assets/styles/blocks/BlockGallery.scss';
</style>

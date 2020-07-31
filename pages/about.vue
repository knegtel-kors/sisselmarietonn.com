<template>
  <article>
    <div class="article-wrapper about">
      <div class="article-header">
        <prismic-rich-text :field="article.title" />
        <FormattedImage :field="article.header" :width="1200" :height="800" />
      </div>
      <DateFormatter :data="article" />
      <prismic-rich-text :field="article.credits" />
      <TabContent :data="article" />
    </div>
  </article>
</template>

<script>
import FormattedImage from '~/components/FormattedImage'
import DateFormatter from '~/components/DateFormatter'
import TabContent from '~/components/TabContent'

export default {
  head() {
    return {
      title: `${this.title} Sissel Marie Tonn`
    }
  },
  components: {
    FormattedImage,
    DateFormatter,
    TabContent
  },
  async asyncData({ $prismic, error, params }) {
    try {
      const article = await $prismic.api.getByUID('article', 'about')
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

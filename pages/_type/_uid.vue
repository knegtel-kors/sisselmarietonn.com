<template>
  <article>
    <div class="article-wrapper">
      <div class="article-header">
        <prismic-rich-text :field="article.title" />
        <DateFormatter :data="article" />
      </div>
      <FormattedImage
        v-if="article.header"
        :field="article.header"
        :width="1200"
        :height="800"
      />
      <ImageGalleryHeader
        v-if="article.header_gallery.length"
        class="image_gallery"
        :slides="article.header_gallery"
      />
      <prismic-rich-text
        v-if="!article.header_gallery.length"
        class="header-caption"
        :field="article.credits"
      />
      <TabContent :data="article" />
    </div>
  </article>
</template>

<script>
import FormattedImage from '~/components/FormattedImage'
import DateFormatter from '~/components/DateFormatter'
import ImageGalleryHeader from '~/components/ImageGalleryHeader'
import TabContent from '~/components/TabContent'
export default {
  head() {
    return {
      title: `${this.title} by Sissel Marie Tonn`,
    }
  },
  components: {
    FormattedImage,
    DateFormatter,
    ImageGalleryHeader,
    TabContent,
  },
  async asyncData({ $prismic, error, params }) {
    try {
      const article = await $prismic.api.getByUID('article', params.uid)
      // Returns data to be used in template
      return {
        article: article.data,
        title: article.data.title[0].text,
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/styles/blocks/BlockArticle.scss';
@import '~/assets/styles/blocks/BlockGallery.scss';
</style>

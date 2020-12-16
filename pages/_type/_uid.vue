<template>
  <article>
    <div class="article-wrapper">
      <div class="article-header">
        <prismic-rich-text :field="article.title" />
        <DateFormatter :data="article" />
      </div>
      <FormattedImage
        v-if="hasHeader(article) && !hasHeaderGallery(article)"
        :field="article.header"
        :width="1200"
        :height="800"
      />
      <ImageGalleryHeader
        v-if="hasHeaderGallery(article)"
        class="image_gallery"
        :slides="article.header_gallery"
      />
      <prismic-rich-text
        v-if="!hasHeaderGallery(article)"
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
import get from 'lodash.get'
import head from 'lodash.head'

const socialMeta = (img) => {
  // All meta tags
  const metaTags = [
    { property: "og:image", content: img },
    { name: "twitter:image", content: img },
  ]

    console.log('tags', metaTags)
  return metaTags
}

export default {
  head() {
    return {
      title: `${this.title} by Sissel Marie Tonn`,
      meta: socialMeta(this.metaImageUrl)
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
      const headerImg = get(article, ['data','header', 'url'])
      const firstGalleryImg = get(article, ['data', 'header_gallery', '0', 'image', 'url'])

      console.log('meta', headerImg || firstGalleryImg || 'https://sisselmarietonn.com/social.jpg')

      return {
        article: article.data,
        title: article.data.title[0].text,
        metaImageUrl: headerImg || firstGalleryImg || 'https://sisselmarietonn.com/social.jpg'
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    hasHeader(article) {
      return Boolean(get(article, ['header']))
    },
    hasHeaderGallery(article) {
      return Boolean(get(article, ['header_gallery'], []).length)
    },
  }
}
</script>

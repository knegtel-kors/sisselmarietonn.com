<template>
  <div class="article-body">
    <div class="tabs">
      <div
        v-if="this.showTabs"
        v-on:click="tab = 'description'"
        class="tab"
        v-bind:class="{ active: tab === 'description' }"
      >
        Description
      </div>
      <div
        v-if="this.showTabs"
        v-on:click="tab = 'research'"
        class="tab"
        v-bind:class="{ active: tab === 'research' }"
      >
        Research
      </div>
    </div>

    <div class="slices">
      <div
        class="slice"
        v-for="slice in content[tab]"
        :key="JSON.stringify(slice).toString()"
      >
        <prismic-rich-text
          v-if="slice.slice_type === 'text'"
          class="text"
          :field="slice.primary.text"
        />
        <ImageGallery
          v-if="slice.slice_type === 'image_gallery' && slice.items.length"
          class="image_gallery"
          :slides="slice.items"
        />
        <FormattedImage
          v-if="slice.slice_type === 'fullwidth_image'"
          class="fullwidth_image"
          :field="slice.primary.image"
          :width="800"
          :height="600"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ImageGallery from '~/components/ImageGallery'
import FormattedImage from '~/components/FormattedImage'

export default {
  data() {
    return {
      tab: 'description',
      content: this.data,
      showTabs: this.data['description'].length && this.data['research'].length
    }
  },
  components: {
    ImageGallery,
    FormattedImage,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  filters: {
    // https://user-guides.prismic.io/en/articles/3309829-image-optimization-imgix-integration
    params(url, width = 'auto', height = 'auto') {
      return (url += `,fit=crop&w=${width}&h=${height}`)
    },
  },
}
</script>

<style lang="scss"></style>

<template>
  <div class="body">
    <div class="tabs">
      <div
        v-on:click="tab = 'description'"
        class="tab"
        v-bind:class="{ active: tab === 'description' }"
      >
        Description
      </div>
      <div
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
          v-if="slice.slice_type === 'image_gallery'"
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
      content: this.data
    }
  },
  components: {
    ImageGallery,
    FormattedImage
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  filters: {
    // https://user-guides.prismic.io/en/articles/3309829-image-optimization-imgix-integration
    params(url, width = 'auto', height = 'auto') {
      return (url += `,fit=crop&w=${width}&h=${height}`)
    }
  }
}
</script>

<style lang="scss">
.tabs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .tab {
    display: inline-block;
    cursor: pointer;
    padding: 0 1rem;

    &.active {
      border-bottom: 3px solid;
    }
  }
}
</style>

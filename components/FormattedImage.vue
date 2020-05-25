<template>
  <img
    v-if="Object.keys(field).length !== 0"
    :src="field.url | params(this.width, this.height)"
    :alt="field.alt"
  />
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
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

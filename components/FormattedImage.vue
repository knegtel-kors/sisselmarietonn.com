<template>
  <img
    loading="lazy"
    v-if="Object.keys(field).length !== 0"
    :srcset="field.url | params(this.width, this.height)"
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
      const size1 = `${url},fit=crop&auto=format&w=${width}&h=${height}`
      const size2 = `${url},fit=crop&auto=format&w=${width*1.5}&h=${height*1.5} 1.5x`
      const size3 = `${url},fit=crop&auto=format&w=${width*2}&h=${height*2} 2x`      
      return `${size1}, ${size2}, ${size3}`
    }
  },
}
</script>

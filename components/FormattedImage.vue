<template>
  <div class="FormattedImageWrapper">
    <img
      v-if="Object.keys(field).length !== 0"
      :src="formatUrl(field.url, ...reduceFraction([this.width, this.height]))"
      :alt="field.alt"
      v-on:load="showFullImage"
    />
    <transition name="fade">
      <img
        loading="lazy"
        v-if="Object.keys(field).length !== 0 && fullImage"
        :srcset="params(field.url, this.width, this.height)"
        :alt="field.alt"
        class="placeholder"

      />
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      fullImage: false,
    }
  },
  methods: {
    reduceFraction(data) {
      let numOne = Number(data[0])
      let numTwo = Number(data[1])
      let scaler = 2
      for (var i = Math.max(numOne, numTwo); i > 1; i--) {
        if (numOne % i == 0 && numTwo % i == 0) {
          numOne /= i
          numTwo /= i
        }
      }

      return [numOne * scaler, numTwo * scaler]
    },
    formatUrl(url, width = 'auto', height = 'auto', scale = 1) {
      return `${url},fit=crop&w=${width * scale}&h=${height * scale} ${scale}x`
    },
    showFullImage() {
      this.fullImage = true
    },
    params(url, width, height) {
      const size1 = this.formatUrl(url, width, height, 1)
      const size2 = this.formatUrl(url, width, height, 1.5)
      const size3 = this.formatUrl(url, width, height, 2)
      return `${size1}, ${size2}, ${size3}`
    },
  },
}
</script>
<style lang="scss">
.fade-enter-active {
  transition: opacity 0.1s;
}
.fade-enter {
  opacity: 0;
}

.FormattedImageWrapper {
  position: relative;
}

.placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>

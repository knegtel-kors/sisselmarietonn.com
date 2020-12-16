<template>
  <div v-if="hasFirstImage" class="gallery">
    <div class="slide">
      <div class="arrow left" v-on:click="decrement">
        <img src="~/assets/img/smt-arrow.svg" alt />
      </div>
      <FormattedImage
        class="slide-img"
        v-if="slides[current].gallery_image"
        :field="slides[current].gallery_image"
        :captions="slides[current].image_captions"
        :width="1600"
        :height="1200"
        @click.native="toggleLightBox()"
      />
      <div class="arrow right" v-on:click="increment">
        <img src="~/assets/img/smt-arrow.svg" alt />
      </div>
    </div>
    <div class="progressbar">
      <span
        class="bar"
        v-for="(slide, index) in slides"
        v-bind:class="{ active: current === index }"
        :key="slide.gallery_image.url"
        v-on:click="current = index"
      ></span>
    </div>
    <LightBox
      v-if="showLightBox"
      :image="slides[current].gallery_image"
      :captions="slides[current].image_captions"
      @click.native="toggleLightBox()"
    />
  </div>
</template>

<script>
import FormattedImage from '~/components/FormattedImage'
import LightBox from '~/components/LightBox'
import get from 'lodash.get'
import head from 'lodash.head'

export default {
  data() {
    return {
      current: 0,
      showLightBox: false,
    }
  },
  components: {
    FormattedImage,
    LightBox,
  },
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasFirstImage() {
      // get the first slide
      // get the gallery_image url
      // force to boolean
      return Boolean(get(head(this.slides), ['gallery_image', 'url']))
    }
  },
  watch: {
  // whenever active changes, this function will run
  showLightBox: function () {
    document.body.style.overflow = this.showLightBox ? 'hidden' : ''
  }
},
  methods: {
    toggleLightBox() {
      this.showLightBox = !this.showLightBox
    },
    increment() {
      if (this.current + 1 === this.slides.length) {
        return (this.current = 0)
      }
      return this.current++
    },
    decrement() {
      if (this.current === 0) {
        return (this.current = this.slides.length - 1)
      }
      return this.current--
    },
  },
}
</script>

<style lang="scss"></style>

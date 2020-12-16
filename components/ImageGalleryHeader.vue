<template>
  <div class="gallery-header">
    <div class="slide">
      <div class="arrow left" v-on:click="decrement">
        <img src="~/assets/img/smt-arrow.svg" alt />
      </div>
      <FormattedImage
        class="slide-img"
        showCaption
        v-if="hasHeaderImage(slides[current])"
        :field="slides[current].image"
        :captions="slides[current].caption"
        :width="1600"
        :height="1200"
        @click.native="openLightBox()"
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
        :key="slide.image.url"
        v-on:click="current = index"
      ></span>
    </div>
    <div v-if="showLightBox" class="lightbox-wrapper">
      <LightBox
        :image="slides[currentLightBox].image"
        :captions="slides[currentLightBox].caption"
        v-on:closebox="showLightBox = false"
        v-on:incrementbox="incrementlightbox"
        v-on:decrementbox="decrementlightbox"
      />
    </div>
  </div>
</template>

<script>
import FormattedImage from '~/components/FormattedImage'
import LightBox from '~/components/LightBox'
import get from 'lodash.get'

export default {
  data() {
    return {
      current: 0,
      currentLightBox: 0,
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
  watch: {
    // whenever active changes, this function will run
    showLightBox: function () {
      document.body.style.overflow = this.showLightBox ? 'hidden' : ''
    },
  },
  methods: {
    openLightBox() {
      this.showLightBox = true
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
    incrementlightbox() {
      if (this.currentLightBox + 1 === this.slides.length) {
        return (this.currentLightBox = 0)
      }
      return this.currentLightBox++
    },
    decrementlightbox() {
      if (this.currentLightBox === 0) {
        return (this.currentLightBox = this.slides.length - 1)
      }
      return this.currentLightBox--
    },
    hasHeaderImage(slide) {
      return Boolean(get(slide, ['image']))
    },
  },
}
</script>

<template>
  <div class="gallery-header">
    <div class="slide">
      <div class="arrow left" v-on:click="decrement">
        <img src="~/assets/img/smt-arrow.svg" alt />
      </div>
      <FormattedImage
        class="slide-img"
        v-if="hasHeaderImage(slides[current])"
        :field="slides[current].image"
        :captions="slides[current].caption"
        :width="800"
        :height="600"
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
        :key="slide.image.url"
        v-on:click="current = index"
      ></span>
    </div>
    <LightBox
      v-if="showLightBox"
      :image="slides[current].image"
      :captions="slides[current].caption"
      @click.native="toggleLightBox()"
    />
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
    hasHeaderImage(slide) {
      return Boolean(get(slide, ['image']))
    },
  },
}
</script>

<style lang="scss"></style>

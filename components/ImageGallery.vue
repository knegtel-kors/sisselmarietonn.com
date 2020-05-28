<template>
  <div class="gallery">
    <div class="slide">
      <div class="arrow left" v-on:click="decrement">left</div>
      <FormattedImage
        :field="slides[current].gallery_image"
        :width="800"
        :height="600"
      />
      <div class="arrow right" v-on:click="increment">right</div>
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
  </div>
</template>

<script>
import FormattedImage from '~/components/FormattedImage'

export default {
  data() {
    return {
      current: 0
    }
  },
  components: {
    FormattedImage
  },
  props: {
    slides: {
      type: Array,
      required: true
    }
  },
  methods: {
    increment() {
      if (this.current + 1 === this.slides.length) {
        return (this.current = 0)
      }
      return this.current++
    },
    decrement() {
      if (this.current === 0) {
        return this.current = this.slides.length - 1
      }
      return this.current--
    }
  }
}
</script>

<style lang="scss">
.slide {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .arrow {
    padding: 1rem;
    border: 1px solid grey;
    border-radius: 100%;
    cursor: pointer;
  }
}

.progressbar {
  display: flex;
  flex-direction: row;

  .bar {
    height: 10px;
    background: grey;
    display: inline-block;
    flex-grow: 1;
    cursor: pointer;

    & + .bar {
      margin-left: 1rem;
    }

    &:hover {
      background: darkgray;
    }

    &.active {
      background: black;
    }
  }
}
</style>

<template>
  <div class="lightbox">
    <img
      class="lightbox-btn"
      src="~/assets/img/menu-close.svg"
      alt="Close lightbox overlay"
      @click="$emit('closebox')"
    />

    <div class="arrow left">
      <img src="~/assets/img/smt-arrow.svg" @click="$emit('incrementbox')" alt />
    </div>
    <FormattedImage
      class="lightbox-img"
      v-if="image"
      :field="image"
      :captions="captions"
      :width="1600"
      :height="1200"
    />
    <div class="arrow right">
      <img src="~/assets/img/smt-arrow.svg" @click="$emit('decrementbox')" alt />
    </div>
  </div>
</template>

<script>
import FormattedImage from '~/components/FormattedImage'

export default {
  props: ['image', 'captions', 'showLightBox'],
  components: {
    FormattedImage,
  }
}
</script>
<style lang="scss">
.lightbox {
  background-color: #000000d3;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  cursor: pointer;

  .lightbox-btn {
    position: fixed;
    top: 3rem;
    right: 0.5rem;
    width: 3rem;
    display: block;
  }

  .lightbox-img {
    max-width: calc(100% - 1rem);
    height: auto;
  }

  .lightbox-img img {
    max-height: 100vh;
  }

  .arrow {
    background-color: $grey;
    opacity: 1 !important;
    border-radius: 50%;
    margin: 0.5rem;
    border: 1px solid;
  }
}
</style>

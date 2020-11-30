<template>
  <div class="lightbox">
    <img
      class="lightbox-btn"
      src="~/assets/img/menu-close.svg"
      alt="Close lightbox overlay"
      @click="$emit('closebox')"
    />
    <div class="lightbox-slides-wrapper">
      <div class="arrow left">
        <img
          src="~/assets/img/smt-arrow.svg"
          @click="$emit('incrementbox')"
          alt
        />
      </div>
      <div  @click="$emit('incrementbox')">

      <FormattedImage
        class="lightbox-img"
        v-if="image"
        :field="image"
        :captions="captions"
        :width="1600"
        :height="1200"
      />
      </div>
      <div class="arrow right">
        <img
          src="~/assets/img/smt-arrow.svg"
          @click="$emit('decrementbox')"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormattedImage from '~/components/FormattedImage'

export default {
  props: ['image', 'captions', 'showLightBox'],
  components: {
    FormattedImage,
  },
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
    height: auto;
  }

  .lightbox-img img {
    max-height: 100vh;
    width: 100%;
  }

  .lightbox-slides-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 48px 1fr 48px;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;

    .arrow {
      padding: 1rem;
      cursor: pointer;
      opacity: 0.4;
      transition: opacity 0.15s;
      background-color: $grey;
      opacity: 1 !important;
      border-radius: 50%;
      border: 1px solid;
      width: 48px;

      &:hover {
        opacity: 1;
      }

      &.left {
        transform: rotate(180deg);
      }

      &.right {
        align-self: right;
      }

      img {
        min-width: 1rem;
        max-width: 1rem;
      }
    }
  }

  @include respond-until($screen-s) {
    .lightbox-slides-wrapper {
      display: flex;
      .arrow {
        display: none;
      }
    }
  }
}
</style>

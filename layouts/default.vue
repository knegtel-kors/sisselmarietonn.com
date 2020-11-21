<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer,
  },
}
</script>
<style lang="scss">
@import '~/assets/styles/fonts.scss';
@import '~/assets/styles/base.scss';
@import '~/assets/styles/blocks/BlockProjectLarge.scss';
@import '~/assets/styles/blocks/Footer.scss';
@import '~/assets/styles/blocks/BlockHeader.scss';
@import '~/assets/styles/blocks/BlockProjectSmall.scss';
@import '~/assets/styles/blocks/Pagination.scss';
@import '~/assets/styles/blocks/BlockArticle.scss';
@import '~/assets/styles/blocks/BlockGallery.scss';
</style>

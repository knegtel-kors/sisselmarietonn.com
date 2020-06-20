<template>
  <article>
    <BigProjectList :projects="bigProjects" />
    <SmallProjectList :projects="smallProjects" type="project" />
  </article>
</template>

<script>
import BigProjectList from '~/components/BigProjectList'
import SmallProjectList from '~/components/SmallProjectList'

export default {
  components: {
    BigProjectList,
    SmallProjectList
  },
  head() {
    return {
      title: `Sissel Marie Tonn`
    }
  },
  async asyncData({ $prismic, error }) {
    try {
      // Query to get API object
      // this should be modified to get the correct articles
      const bigProjects = await $prismic.api.query(
        [
          $prismic.predicates.at('document.type', 'article'),
          $prismic.predicates.at('my.article.type', 'Project')
        ],
        { orderings: '[my.article.date desc]', pageSize: 3 }
      )

      // this should be modified to get the correct articles
      const smallProjects = await $prismic.api.query(
        [
          $prismic.predicates.at('document.type', 'article'),
          $prismic.predicates.at('my.article.type', 'Project')
        ],
        { orderings: '[my.article.date desc]', pageSize: 3 }
      )

      // Returns data to be used in template
      return {
        bigProjects: bigProjects.results,
        smallProjects: smallProjects.results
      }
    } catch (e) {
      // Returns error page
      console.log(e)
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/styles/fonts.scss";
@import "~/assets/styles/values.scss";
@import "~/assets/styles/base.scss";
</style>

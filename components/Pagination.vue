<template>
  <div class="pagination">
    <nuxt-link
      class="prev"
      :to="{ path: type, query: { page: pagination.prev } }"
    >
      <span v-if="pagination.current > 1">
        previous
      </span>
    </nuxt-link>

    <div class="numbers">
      <nuxt-link
        v-for="number in pagination.total_pages"
        :key="number"
        class="number"
        :to="{ path: type, query: { page: number } }"
        v-bind:class="{ active: number === pagination.current }"
      >
      <span v-if="pagination.total_pages > 1">
        {{ number }}
      </span>
      </nuxt-link>
    </div>

    <nuxt-link
      class="next"
      :to="{ path: type, query: { page: pagination.next } }"
    >
      <span v-if="pagination.next <= pagination.total_pages">
        next
      </span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>

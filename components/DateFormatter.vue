<template>
  <div class="dates">
    <span v-if="data.start_date">{{ data.start_date | onlyYear }}</span>
    <span v-if="data.end_date">{{ data.end_date | onlyYear }}</span>
    <span v-if="data.ongoing && !data.end_date">ongoing</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  filters: {
    onlyYear(val) {
      let date = new Date(val)
      return date.getFullYear()
    }
  }
}
</script>

<style lang="sass"></style>

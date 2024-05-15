<template>
  <b-link target="_blank" v-if="url.startsWith('http')" :href="url">
    {{ url }}
  </b-link>
  <span v-html="url" v-else></span>
</template>

<script>
export default {
  name: "ChallengeUrl",
  props: {
    url: {
      required: true
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>

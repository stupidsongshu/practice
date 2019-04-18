<template>
  <div>
    <h1>keep-alive index</h1>
    <!-- <router-link :to="{name: 'KeepAliveList'}">go to keep-alive list</router-link> -->
    <h4 @click="toKeepAliveList">go to keep-alive list</h4>
  </div>
</template>

<script>
export default {
  methods: {
    toKeepAliveList() {
      this.$store.commit('Refresh', true)
      this.$router.push({ name: 'KeepAliveList' })
    }
  }
}
</script>

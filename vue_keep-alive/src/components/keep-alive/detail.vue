<template>
  <div>
    <h1>keep-alive detail</h1>
    <!-- <router-link :to="{name: 'KeepAliveList'}">back to keep-alive list</router-link> -->

    <div>
      <span @click="back">back to keep-alive list</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

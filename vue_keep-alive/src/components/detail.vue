<template>
  <div>
    <router-link :to="{name: 'list'}">back to list</router-link>
    <h4>This is detail {{id}}</h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: -1
    }
  },
  mounted() {
    this.id = this.$route.params.id
  }
}
</script>

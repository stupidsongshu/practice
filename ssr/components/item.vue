<template>
  <div>{{item.title}}</div>
</template>

<script>
export default {
  asyncData({store, route}) {
    store.dispatch('fetchItems', route.params.id)
  },
  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id]
    }
  }
}
</script>

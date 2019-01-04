<template>
  <div>
    <p>grandfather</p>
    <button @click="loadSubComp = true">点击后加载子组件</button>
    <div v-if="loadSubComp">
      <father />
    </div>
  </div>
</template>

<script>
import father from './father'
export default {
  components: {
    father
  },
  data () {
    return {
      loadSubComp: false
    }
  },
  created() {
    console.log(this.$route)
  }
}
</script>

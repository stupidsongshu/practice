<template>
  <div>
    <router-link :to="{name: 'index'}">back to home</router-link>
    <ul>
      <li class="item" v-for="(item,index) in list" :key="'item'+index">
        <router-link :to="{name: 'detail', params: {id: item.id}}">
          <span>{{item.id}}</span>
          <span>{{item.txt}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      list: []
    }
  },
  mounted() {
    console.log('mounted')
    let indexToListCount = this.$store.state.indexToListCount
    let listNeedRefresh = this.$store.state.listNeedRefresh
    if (indexToListCount === 1 && listNeedRefresh) {
      console.log('mounted init')
      this.init()
    }
  },
  activated() {
    console.log('activated')
    let indexToListCount = this.$store.state.indexToListCount
    let listNeedRefresh = this.$store.state.listNeedRefresh
    if (indexToListCount > 1 && listNeedRefresh) {
      console.log('activated init')
      let list = this.init()
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'index') {
        let indexToListCount = vm.$store.state.indexToListCount
        indexToListCount++
        vm.$store.commit('INDEX_TO_LIST_COUNT', indexToListCount)
      }
    })
  },
  methods: {
    init() {
      this.list = []
      for (var i = 0; i < 50; i++) {
        this.list.push({
          id: i,
          txt: (99*Math.random() - 10*Math.random() + 10).toFixed(0)
        })
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
ul,li {
  padding: 0;
  list-style: none;
}
.item {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #999;
  text-align: left;
}
.item span:nth-child(1) {
  display: inline-block;
  width: 30px;
}
</style>

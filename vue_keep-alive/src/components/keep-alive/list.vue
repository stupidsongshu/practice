<template>
  <div>
    <h1>keep-alive list</h1>
    <div>
      <h4 @click="back">back to keep-alive index</h4>
    </div>

    <ul>
      <li class="item" v-for="(item,index) in list" :key="'item'+index">
        <div @click="toKeepAliveDetail">
          <span>{{item.id}}</span>
          <span>{{item.txt}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  computed: {
    refresh() {
      return this.$store.state.refresh
    }
  },
  activated() {
    if (this.refresh) {
      console.log('keep-alive activted init')
      this.init()
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    toKeepAliveDetail() {
      this.$store.commit('Refresh', false)
      this.$router.push({ name: 'KeepAliveDetail' })
    },
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
  display: inline-block;
  margin-top: 20px;
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

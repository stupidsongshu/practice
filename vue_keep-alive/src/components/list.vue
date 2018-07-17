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
    console.log('组件a未缓存')
    for (var i = 0; i < 50; i++) {
      this.list.push({
        id: i,
        txt: (99*Math.random() - 10*Math.random() + 10).toFixed(0)
      })
    }
  },
  // activated() {
  //   console.log('组件a已缓存')
  //   console.log('activated', this.$route.meta.keepAlive)
  // },
  beforeRouteEnter(to, from, next) {
    console.log('来源：', from.path)
    // if (from.name === 'index') {
    //   next(vm => {
    //     vm.$route.meta.keepAlive = true
    //   })
    // } else {
    //   next()
    // }

    next(vm => {
      vm.$route.meta.keepAlive = true
    })
  },
  beforeRouteLeave(to, from, next) {
    console.log('跳往：', to.path)
    if (to.name === 'index') {
      this.$route.meta.keepAlive = false
    } else {
      this.$route.meta.keepAlive = true
    }
    next()
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

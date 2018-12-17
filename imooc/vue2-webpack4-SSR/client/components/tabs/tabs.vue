<script>
import TabContainer from './tab-container.vue'
export default {
  name: 'tabs',
  components: {
    TabContainer
  },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  // 提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。
  // provide () {
  //   return {
  //     valueProvide: this.value
  //   }
  // },
  methods: {
    onChange (index) {
      this.$emit('change', index)
    }
  },
  render () {
    /**
     * 这种方式的问题：
     * tabs-content里面的渲染的是tab组件的默认插槽，在tab组件里面有响应式数据时会显得'慢半拍'
     */
    // const contents = this.panes.map(pane => {
    //   return pane.active ? pane.$slots.default : null
    // })
    // return (
    //   <div class="tabs">
    //     <ul class="tabs-header">
    //       {this.$slots.default}
    //     </ul>
    //     <div class="tabs-content">
    //       {contents}
    //     </div>
    //   </div>
    // )

    /**
     * 为了解决以上问题：
     * 新增一个组件tab-container，利用props解决
     * TODO目前还是有问题尚未解决(切换tab组件后才刷新UI)，这个bug到底是啥呦！2018-12-15 10:55:55
     */
    return (
      <div class="tabs">
        <ul class="tabs-header">
          {this.$slots.default}
        </ul>
        <tab-container panes={this.panes}></tab-container>
      </div>
    )
  }
}
</script>

<style lang="stylus" scoped>
.tabs-header
  display: flex
  justify-content: space-around
  list-style none
  padding: 0
  margin: 0
</style>

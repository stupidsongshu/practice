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

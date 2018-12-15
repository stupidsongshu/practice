import Notification from './index.vue'

export default {
  extends: Notification,
  data () {
    return {
      verticalOffset: 50,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  },
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    console.log('autoClose:', this.autoClose)
    this.createTimer()
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(_ => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      // 注意：要想触发此函数，需要将组件默认设置为隐藏(visible: false)，待元素插入到DOM里面后再设置为显示(visible: true)
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestory () {
    this.clearTimer()
  }
}

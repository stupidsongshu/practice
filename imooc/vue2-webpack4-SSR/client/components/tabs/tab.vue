<script>
export default {
  name: 'tab',
  props: {
    index: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  // inject: ['valueProvide'],
  computed: {
    active () {
      // return this.index === this.valueProvide
      return this.index === this.$parent.value
    }
  },
  mounted () {
    this.$parent.panes.push(this)
  },
  methods: {
    handleClick () {
      this.$parent.onChange(this.index)
    }
  },
  render () {
    const label = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} on-click={this.handleClick}>
        {label}
      </li>
    )
  }
}
</script>

<style lang="stylus" scoped>
.tab
  cursor: pointer
.active
  color: red
  text-decoration: underline
</style>

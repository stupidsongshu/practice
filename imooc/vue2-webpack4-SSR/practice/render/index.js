import Vue from 'vue'

let div = document.createElement('div')
document.body.appendChild(div)

const component = {
  props: ['propVal'],
  data() {
    return {
      style: {
        width: '200px',
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #abcdef'
      }
    }
  },
  // template: `
  //   <div :style="style" id="test-id" @click="$emit('click')">
  //     <slot />
  //     <slot name="header"></slot>
  //     {{propVal}}
  //   </div>
  // `,
  render() {
    return this.$createElement(
      'div',
      {
        style: this.style,
        on: {
          click: () => {
            this.$emit('click')
          }
        }
      },
      [
        this.$slots.default,
        this.$slots.header,
        this.propVal
      ]
    )
  },
  // created() {
  //   // 禁止右键
  //   document.body.oncontextmenu=document.body.ondragstart= document.body.onselectstart=document.body.onbeforecopy=function(){return false}
  //   document.body.onselect=document.body.oncopy=document.body.onmouseup=function(){document.selection.empty()}
  // }
}

const component1 = {
  data() {
    return {
      style: {
        width: '200px',
        padding: '20px',
        border: '1px solid #abcdef'
      }
    }
  },
  template: `
    <div :style="style">
      <slot></slot>
    </div>
  `
}

new Vue({
  el: div,
  components: {
    comp: component,
    comp1: component1
  },
  data() {
    return {
      value: 'Hello Vue'
    }
  },
  methods: {
    handleClick() {
      console.log('clicked')
    }
  },
  // template: `
  //   <div>
  //     <comp ref="comp" propVal="props value" id="test-id1" @click="handleClick">
  //       <span class="a-a c">{{value}}</span>
  //       <div slot="header">header slot</div>
  //       <p>直接在组件(注意不是原生DOM元素)上绑定事件(如click)是不会生效的，需要在子组件里面通过 vm.$emit 发射相应事件处理后才会生效</p>
  //     </comp>
  //     <comp1 @click.native="handleClick">
  //       nativeOn 仅对于组件，用于监听原生事件，而不是组件内部使用 vm.$emit 触发的事件
  //     </comp1>
  //   </div>
  // `,
  render(h) {
    return h(
      'div',
      [
        h(
          'comp',
          {
            ref: 'comp',
            props: {
              propVal: 'props value'
            },
            attrs: {
              id: 'test-id'
            },
            on: {
              click: this.handleClick
            }
          },
          [
            h(
              'span',
              {
                class: {
                  'a-a': true,
                  b: false,
                  c: true
                }
              },
              this.value
            ),
            h(
              'div',
              {
                slot: 'header'
              },
              'header slot'
            ),
            h(
              'p',
              '直接在组件(注意不是原生DOM元素)上绑定事件(如click)是不会生效的，需要在子组件里面通过 vm.$emit 发射相应事件处理后才会生效'
            )
          ]
        ),
        h(
          'comp1',
          {
            nativeOn: {
              click: this.handleClick
            }
          },
          'nativeOn 仅对于组件，用于监听原生事件，而不是组件内部使用 vm.$emit 触发的事件'
        )
      ]
    )
  }
})

import Vue from 'vue'
import component from './func-notification'

const NotificationConstructor = Vue.extend(component)

let instances = []
let seed = 0

const removeInstance = (instance) => {
  if (!instance) return
  const index = instances.findIndex(inst => inst.id === instance.id)
  instances.splice(index, 1)

  const len = instances.length
  // if (len <= 1) return
  const removeHeight = instance.vm.height
  console.log('removeHeight:', removeHeight)
  for (let i = index; i < len; i++) {
    // 第一种
    // instances[i].verticalOffset -= instances[i].vm.$el.offsetHeight + 16
    // instances[i].verticalOffset = instances[i].verticalOffset - instances[i].vm.$el.offsetHeight - 16
    // 第二种：依赖transition after-enter 以后计算DOM元素高度
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  // 防止服务端渲染操作DOM出错
  let isServer = Vue.prototype.$isServer
  console.log('is server:', isServer)
  if (isServer) return

  const {
    autoClose,
    ...rest
  } = options

  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 5000 : autoClose
    }
  })
  const id = `notification_${seed++}`
  instance.id = id

  /**
   * vm.$mount( [elementOrSelector] )
   * 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
   * 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。
   */
  instance.vm = instance.$mount()
  // console.log(instance.vm)
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)

  // 性能优化：关闭后删除引用
  instance.vm.$on('closed', _ => {
    removeInstance(instance)
    // 移除DOM元素
    document.body.removeChild(instance.vm.$el)
    // 解除事件绑定
    instance.vm.$destroy()
  })

  instance.vm.$on('close', _ => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify

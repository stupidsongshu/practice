<template>
  <div>
    <form class="form-login" @submit="doLogin">
      <h1>Login</h1>
      <span>{{errorMsg}}</span>

      <input class="input-login" type="text" v-model="userName" placeholder="请输入用户名">
      <input class="input-login" type="password" v-model="password" placeholder="请输入密码">
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
import notify from '../../components/notification/function.js'
import { mapActions } from 'vuex'
export default {
  metaInfo: {
    title: 'LOGIN page'
  },
  data() {
    return {
      userName: 'zys',
      password: 'zys',
      errorMsg: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    doLogin (e) {
      e.preventDefault()
      if (!this.validate()) return
      this.login({
        userName: this.userName.trim(),
        password: this.password.trim()
      }).then(_ => {
        notify({
          content: '登录成功'
        })
        this.$router.replace('/todo')
      }).catch(err => {
        notify({
          content: err.message
        })
      })
    },
    validate () {
      if (!this.userName.trim()) {
        this.errorMsg = '用户名不能为空'
        return false
      }
      if (!this.password.trim()) {
        this.errorMsg = '密码不能为空'
        return false
      }
      this.errorMsg = ''
      return true
    }
  }
}
</script>

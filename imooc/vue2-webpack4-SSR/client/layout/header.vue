<template>
  <div :class="$style.mainHeader">
    <h1>Todo</h1>
  </div>
</template>

<style lang="stylus" module>
// CSS Modules 是一个流行的，用于模块化和组合 CSS 的系统。vue-loader 提供了与 CSS Modules 的一流集成，可以作为模拟 scoped CSS 的替代方案。
// https://vue-loader.vuejs.org/zh/guide/css-modules.html
.main-header
  text-align center
  h1
    margin 20px
    font-size 100px
    font-weight 100
    color rgba(175, 47, 47, .4)
</style>


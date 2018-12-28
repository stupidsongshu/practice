<template>
  <div class="spinner">
    <div class="dot1"></div>
    <div class="dot2"></div>
  </div>
</template>

<style lang="stylus" scoped>
.spinner
  position: relative
  margin: 100px auto
  width: 40px
  height: 40px
  text-align: center
  animation: sk-rotate 2.0s infinite linear
.dot1, .dot2
  position: absolute
  display: inline-block
  width: 60%
  height: 60%
  top: 0
  background-color: #333
  border-radius: 100%
  animation: sk-bounce 2.0s infinite ease-in-out
.dot2
  top: auto
  bottom: 0
  animation-delay: -1.0s
@keyframes sk-rotate {
  100% {
    transform: rotate(360deg)
  }
}
@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0.0)
  }
  50% {
    transform: scale(1.0)
  }
}
</style>

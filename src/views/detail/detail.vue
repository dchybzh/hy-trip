<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="datail">
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script setup>
// import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
// 1.通过当前路由route 拿到传递过来的id
console.log(route.params.id)

// 2.点击返回按钮
const router = useRouter()
const onClickLeft = () => {
  router.back()
}
</script>

<style scoped lang="less"></style>

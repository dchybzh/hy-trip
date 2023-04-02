<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="loading" v-if="mainStore.isLoading" @click="loadingClick">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/modules/main'
const mainStore = useMainStore()

// 点击背景蒙版，停止显示加载
const loadingClick = () => {
  mainStore.isLoading = false
}
</script>

<style scoped lang="less">
.loading {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  // 背景蒙版
  background-color: rgba(0, 0, 0, 0.2);

  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 104px;
    height: 104px;
    background: url(../../assets/img/home/loading-bg.png) 0 0 / 100% 100%;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
  }
}
</style>

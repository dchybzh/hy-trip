<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box></home-search-box>
  </div>
</template>

<script setup>
// import { ref, reactive } from 'vue'
import homeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import { useHomeStore } from '@/stores/modules/home'

// 1.发送网络请求
const homeStore = useHomeStore()
homeStore.fetchgetHotSuggests()
</script>

<style scoped lang="less">
.home {
  .banner {
    img {
      width: 100%;
    }
  }
}
</style>

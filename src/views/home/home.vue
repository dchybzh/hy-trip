<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <div class="location">
      <div class="city">广州</div>
      <div class="position">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import homeNavBar from './cpns/home-nav-bar.vue'
</script>

<style scoped lang="less">
.home {
  .banner {
    img {
      width: 100%;
    }
  }
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;
    .city {
      flex: 1;
    }
    .position {
      display: flex;
      align-items: center;
      width: 74px;
      .text {
        font-size: 1px;
      }
      img {
        width: 18px;
        height: 18px;
        margin-left: 4px;
      }
    }
  }
}
</style>

<template>
  <div class="home-category">
    <template v-for="item in categories" :key="item.id">
      <div class="item">
        <div class="img">
          <img :src="item.pictureUrl" alt="" />
        </div>
        <div class="title">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'
import { useHomeStore } from '@/stores/modules/home'
import { storeToRefs } from 'pinia'

const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)
</script>

<style scoped lang="less">
.home-category {
  display: flex;
  overflow-x: auto;
  height: 80px;
  margin: 0px 16px;
  // 谷歌浏览器隐藏滚动条，表示给home-category伪元素
  &::-webkit-scrollbar {
    display: none;
  }
  // 火狐浏览器隐藏滚动条
  scrollbar-width: none;
  .item {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    font-size: 12px;
    padding-top: 10px;
    width: 70px;
    height: 70px;
    text-align: center;
    img {
      width: 32px;
      height: 32px;
      margin-bottom: 5px;
    }
  }
}
</style>

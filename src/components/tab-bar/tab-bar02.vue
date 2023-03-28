<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabBarData" :key="item.text">
      <div class="tab-bar-item" :class="{ active: currentIndex === index }" @click="itemClick(item, index)">
        <!-- <img :src="require(item.image)" alt="" /> // webpack可以用require()包裹 -->
        <img v-if="currentIndex !== index" :src="getAssetsURL(item.image)" alt="" />
        <img v-else :src="getAssetsURL(item.active)" alt="" />
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import tabBarData from '@/assets/localData/tabBarData.js'
import { getAssetsURL } from '@/utils/get_assets_img.js'
import { useRouter } from 'vue-router'
const currentIndex = ref(0)
// 把数据单独抽取出来，抽取到单独的文件assets/localData/tabBarData.js
// const tabBarData = [
//   {
//     text: '首页',
//     image: '@/assets/img/tabbar/tab_home.png',
//     active: '@/assets/img/tabbar/tab_home_active.png',
//     path: '/home'
//   },
//   {
//     text: '收藏',
//     image: '@/assets/img/tabbar/tab_favor.png',
//     active: '@/assets/img/tabbar/tab_favor_active.png',
//     path: '/favor'
//   },
//   {
//     text: '订单',
//     image: '@/assets/img/tabbar/tab_order.png',
//     active: '@/assets/img/tabbar/tab_order_active.png',
//     path: '/order'
//   },
//   {
//     text: '消息',
//     image: '@/assets/img/tabbar/tab_message.png',
//     active: '@/assets/img/tabbar/tab_message_active.png',
//     path: '/message'
//   }
// ]

// 动态加载资源方法utils/get_assets_img.js
// export const getAssetsURL = (image) => {
//   // new URL(参数一是相对路径，参数二是当前文件的路径)，意思是根据参数二(当前路径)拿到参数一的相对路径
//   return new URL(`../assets/img/${image}`, import.meta.url).href
// }
const router = useRouter()
const itemClick = (item, index) => {
  currentIndex.value = index
  router.push(item.path)
}
</script>

<style scoped lang="less">
.tab-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  border-top: 1px solid #f3f3f3;
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.active {
      color: var(--primary-color);
    }
    img {
      width: 33px;
      margin-bottom: 2px;
    }
    .text {
      font-size: 15px;
    }
  }
}
</style>

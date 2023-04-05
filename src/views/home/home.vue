<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home" ref="homeRef">
    <home-nav-bar></home-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-search-box></home-search-box>
    <home-categories></home-categories>
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar></search-bar>
    </div>
    <home-content></home-content>
  </div>
</template>

<script setup>
import { ref, watch, computed, onActivated } from 'vue'
import homeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue'
import searchBar from '@/components/search-bar/search-bar.vue'
import { useHomeStore } from '@/stores/modules/home'
import useScroll from '@/hooks/useScroll'

// 1.发送网络请求
const homeStore = useHomeStore()
// 1.1获取热门推荐
homeStore.fetchgetHotSuggests()
// 1.2获取推荐分类
homeStore.fetchCategoriesData()
// 1.3获取房屋列表
homeStore.fetchHomeHouseList()

// 2.监听 window 创建的滚动
// 1.当我们离开页面时，我们移除监听
// 2.如果别的页面也进行类似的监听，会编写重复的代码
// const scrollListenerHandler = () => {
//   const clientHeight = document.documentElement.clientHeight // 客户端的高度
//   const scrollTop = document.documentElement.scrollTop // 滚动的距离
//   const scrollHeight = document.documentElement.scrollHeight // 所有可滚动的高度
//   console.log(clientHeight, scrollTop, scrollHeight)
//   if (clientHeight + scrollTop >= scrollHeight) {
//     homeStore.fetchHomeHouseList()
//   }
// }
// onMounted(() => {
//   window.addEventListener('scroll', scrollListenerHandler)
// })

// // 移除监听
// onUnmounted(() => {
//   window.removeEventListener('scroll', scrollListenerHandler)
// })

// 方法一
// useScroll(() => {
//   homeStore.fetchHomeHouseList()
// })

// 方法二
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHomeHouseList().then(() => {
      isReachBottom.value = false // 意思是拿到回调函数的结果后，再修改状态
    })
  }
})

// 3.搜索框显示的控制
// 方法1，watch监听
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newValue) => {
//   isShowSearchBar.value = newValue > 100
// })

// 如果定义的可响应式数据，依赖另外一个可响应式的数据，那么可以使用计算属性(computed)
// 方法2 computed计算属性，计算属性是有缓存的
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 350
})

// 跳转回home时，保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})
</script>

<style scoped lang="less">
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  margin-bottom: 50px;

  .banner {
    img {
      width: 100%;
    }
  }
  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    z-index: 1;
    background-color: #fff;
  }
}
</style>

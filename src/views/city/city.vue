<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="city top-page">
    <div class="top">
      <!-- 1.搜索框 -->
      <van-search v-model="searchValue" show-action shape="round" placeholder="城市/区域/位置" @cancel="onCancel" />

      <!-- 2.tab 的切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <city-group :group-Data="currentGroup"></city-group>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city.js'
import { storeToRefs } from 'pinia'
import CityGroup from './cpns/city-group.vue'

const router = useRouter()
// 1.头部搜索框
const searchValue = ref('')
// const onSearch = (val) => showToast(val)
const onCancel = () => {
  router.back()
}

// 2.tab 标签页，通过绑定 标签的 name 显示内容
const tabActive = ref('')

/*
  这个位置发送网络请求有两个缺点：
  1.如果网络请求太多，那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
  2.如果页面封装了很多的子组件，子组件需要这些数据，我们必须一步步将数据传递过去（props)
*/
// 3.网络请求：发请求获取城市的数据
// const allCity = ref({})
// getCityAll().then((res) => {
//   console.log(res.data)
//   allCity.value = res.data.data
// })

// 3.从 store 中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)
// console.log(allCities.value, '--allCities.value--')
// 4.目的：获取选中标签后的数据
// 4.1.获取正确的key：将 tabs 中绑定的 tabActive 正确绑定
// 4.2.根据 key 从 allCities 获取数据，默认直接获取的数据不升级响应式的，
// 4.3.想要响应式得需要使用 computed 计算数属性包裹
// const currentGroup = allCities.value[tabActive.value]
const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style scoped lang="less">
.city {
  // 通过top 固定定位实现，滚动条太长不好设置
  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }
  // .content {
  //   margin-top: 100px;
  // }

  .top {
    position: relative;
    z-index: 9;
  }
  // 固定头部使局部滚动 overflow-y: auto
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>

<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList">
      <!-- <van-index-bar :sticky="false"> -->
      <van-index-anchor index="热门" />
      <div class="hot-list">
        <template v-for="item in groupData.hotCities" :key="item.cityId">
          <div class="hot-city" @click="cityClick(item)">
            {{ item.cityName }}
          </div>
        </template>
      </div>
      <template v-for="item in groupData.cities" :key="item.group">
        <van-index-anchor :index="item.group" />
        <template v-for="iten in item.cities" :key="iten.cityId">
          <van-cell :title="iten.cityName" @click="cityClick(iten)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

// 1.父传子数据，定义props接收
const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 2.动态索引，筛选出city里的每个item的group字母
// 注意：map的写法，以及先判断props.groupData.cities是不是undefined
const indexList = computed(() => {
  if (!props.groupData.cities) return
  const list = props.groupData.cities.map((item) => item.group)
  list.unshift('#') // 在历史他前面添加 #
  // console.log(list)
  return list
})

// 3.监听城市的点击
const router = useRouter()
const cityStore = useCityStore()

const cityClick = (city) => {
  // 选中当前城市
  // console.log(city, '---city---')
  // 把当前选中的city存到store里，然后页面的显示再从store中获取
  cityStore.currentCity = city
  // 返回上一级
  router.back()
}
</script>

<style scoped lang="less">
.hot-list {
  display: flex;
  flex-wrap: wrap;
  .hot-city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    background-color: #fff4ec;
    text-align: center;
    line-height: 28px;
    margin-left: 16px;
    margin-bottom: 10px;
  }
}
</style>

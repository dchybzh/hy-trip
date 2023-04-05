<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabBarData" :key="item.name">
        <van-tabbar-item :to="item.path">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetsURL(item.image)" />
            <img v-else :src="getAssetsURL(item.active)" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import tabBarData from '@/assets/localData/tabBarData'
import { getAssetsURL } from '@/utils/get_assets_img.js'
import { useRoute } from 'vue-router'

const currentIndex = ref(0)
// 监听路由变化，找到对应的索引，设置 curentIndex 的值
// 因为图标用的是本地图片，不是Vant库里的，所以有点麻烦
const route = useRoute() // useRoute 返回当前路由地址

watch(route, (newRoute) => {
  // console.log(newRoute.path)
  const index = tabBarData.findIndex((item) => item.path === newRoute.path)
  if (index === -1) return
  currentIndex.value = index
})
</script>

<style scoped lang="less">
.tab-bar {
  // 如果使用的是 vant内部的icon，想修改样式
  // 1.在局部定义一个变量：只针对.tab-bar 子元素才生效， 3.在全局定义变量
  // --van-tabbar-item-icon-size: 30px !important;

  // 2.找到类，对类中的css属性重写，因为scoped是只针对当前作用域，所以这里需要加上:deep()
  // :deep(.class)找到子组件的类，让子组件的类也可以生效
  // :deep(.van-tabbar-item__icon) {
  //   font-size: 50px;
  // }

  // 没有使用第三方库，使用的是本地的图片
  img {
    height: 28px;
  }
}
</style>

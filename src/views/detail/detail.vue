<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="datail top-page" ref="detailRef">
    <tab-control ref="tabControlRef" @onTabclick="tabClick" class="tabs" v-if="showTabControl" :title="names"></tab-control>
    <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
    <!-- 添加判断，防止刚开始数据为空的报错 -->
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swiper :swipe-data="mainPart.topModule.housePicture.housePics"></detail-swiper>
      <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"></detail-infos>
      <detail-facility name="设施" :ref="getSectionRef" :houseFacility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
      <detail-landlord name="房东" :ref="getSectionRef" :landlord-data="mainPart.dynamicModule.landlordModule"></detail-landlord>
      <detail-comment name="评论" :ref="getSectionRef" :comment-data="mainPart.dynamicModule.commentModule"></detail-comment>
      <detail-notice name="须知" :ref="getSectionRef" :notice-data="mainPart.dynamicModule.rulesModule"></detail-notice>
      <deatil-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"></deatil-map>
      <detail-intro :price-intro="mainPart.introductionModule"></detail-intro>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfos } from '@/services/index'

import TabControl from '@/components/tab-control/tab-control.vue'
import useScroll from '@/hooks/useScroll.js'

import DetailSwiper from './cpns/detail_01-swiper.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailComment from './cpns/detail_05-comment.vue'
import DetailNotice from './cpns/detail_06-notice.vue'
import DeatilMap from './cpns/detail_07-map.vue'
import DetailIntro from './cpns/detail_08-intro.vue'

const route = useRoute()
// 1.通过当前路由route 拿到传递过来的id
// console.log(route.params.id)
const houseId = route.params.id

// 2.点击返回按钮
const router = useRouter()
const onClickLeft = () => {
  router.back()
}

// 3.发送网络请求 获取房屋数据
const detailInfos = ref({})
const mainPart = computed(() => detailInfos?.value.mainPart)
getDetailInfos(houseId).then((res) => {
  // console.log(res.data.data)
  detailInfos.value = res.data.data
})

// 4.tabControl 相关操作,
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value > 300
})

const tabControlRef = ref()

// 方法一
// const scetionEls = []
// const getSectionRef = (value) => {
//   // console.log(value.$el, '---value.$el--')
//   console.log('---------') // 会打印很多次 使用v-memo="[mainPart]"
//   scetionEls.push(value?.$el)
// }

// 方法二
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})

// 点击返回，当卸载的时候也会执行这个函数，卸载的时候给的value是null值
const getSectionRef = (value) => {
  // console.log(value.$el, '---value.$el--')
  if (!value) return
  const name = value.$el.getAttribute('name') // 获取元素的属性getAttribute
  // console.log(name, '--name--')
  sectionEls.value[name] = value.$el
}

// 子组件传递过来的点击事件
let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  // console.log('----tabclick----')
  // console.log(index, '---index---')
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  // 元素距离顶部的距离
  let distance = el.offsetTop
  if (index !== 0) {
    distance = distance - tabControlRef.value.$el.offsetHeight
  }

  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    // 因为ref绑定的是组件，.value只能拿到组件，而这里想要组件的根元素距离父元素的距离，所以再 .$el可以拿到组件的根元素
    // top: sectionEls[index].offsetTop - 44,
    top: distance,
    behavior: 'smooth'
  })
}

// 5 监听页面滚动，滚动时匹配对应的tabControl索引
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return

  // 1.获取所有的区域的 offsetTops
  const els = Object.values(sectionEls.value)
  // console.log(els, '--els---')
  const values = els.map((el) => el.offsetTop)
  // console.log(values, '--values--')

  // 2.根据 newValue 去匹配想要的索引
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    // console.log(value, '--value--')
    // console.log(value, newValue, '--newValue--')
    if (value > newValue + 44) {
      index = i - 1
      break
    }
  }
  // console.log(index, '--index--')
  // 调用子组件的方法，把index设置给子组件
  tabControlRef.value?.setActive(index)
})
</script>

<style scoped lang="less">
.tabs {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}
.footer {
  text-align: center;
  img {
    width: 40%;
  }
  .text {
    margin-top: 15px;
    margin-bottom: 30px;
    color: #7688a7;
  }
}
</style>

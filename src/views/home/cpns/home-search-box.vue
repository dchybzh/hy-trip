<template>
  <div class="search-box">
    <!-- 1.位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>

    <!-- 2.日期范围 -->
    <div class="section date-range border-gray-line" @click="showCalendar = true">
      <div class="start">
        <span class="tip">入住</span>
        <span class="time">{{ startDateStr }}</span>
      </div>
      <div class="stay">共{{ stayCount }}晚</div>
      <div class="end">
        <span class="tip">离店</span>
        <span class="time">{{ endDateStr }}</span>
      </div>
    </div>
    <van-calendar v-model:show="showCalendar" type="range" color="#ff9854" :round="false" @confirm="onConfirm" :show-confirm="false" />
    <!-- 3.价格和人数区域 -->
    <div class="section price-counter border-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字区域 -->
    <div class="section keyword border-gray-line">关键字/位置/民宿名</div>
    <!-- 4.热门建议 -->
    <div class="section hot-suggests">
      <template v-for="item in hotSuggests" :key="item.tagText.text">
        <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
    <!-- 5.搜索按钮 -->
    <div class="section search-btn" @click="searchBtnClick">
      <div class="btn">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import useCityStore from '@/stores/modules/city'
import { useHomeStore } from '@/stores/modules/home'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { formatMonthDay, getDiffDays } from '@/utils/format_time'
import { useMainStore } from '@/stores/modules/main'

// 0.先拿到 router
const router = new useRouter()
// 1.点击城市跳转到新的页面
const cityClick = () => {
  console.log('----点击城市--- ')
  router.push('/city')
}

// 2.获取地理位置信息，纬度latitude/longitude经度 位置/城市
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log('获取位置成功！', res)
    },
    (err) => {
      console.log('获取位置失败！', err)
    },
    {
      enableHighAccuracy: true, // 位置是否精确获取
      timeout: 5000, //获取位置允许的最长时间
      maximumAge: 1000 // 多久更新获取一次位置
    }
  )
}

// 3.当前城市，从store 中获取 currentCity 并展示
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

// 4.日期范围的处理
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)
// console.log(startDate.value, endDate)
const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
const stayCount = ref(getDiffDays(startDate.value, endDate.value))

// 5.选择日期区间
const showCalendar = ref(false)
const onConfirm = (value) => {
  // console.log(value, '--value--')
  // 5.1设置日期
  const selectStartDate = value[0]
  const selectEndDate = value[1]
  // console.log(selectStartDate, selectEndDate, '--value--')
  mainStore.startDate = selectStartDate
  mainStore.endDate = selectEndDate
  stayCount.value = getDiffDays(selectStartDate, selectEndDate)
  // 2.隐藏日历
  showCalendar.value = false
}

// 6.热门城市建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 7.监听搜索按钮，跳转的同时要传递一些参数
const searchBtnClick = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName
    }
  })
}
</script>

<style scoped lang="less">
.search-box {
  --van-calendar-popup-height: 100%;
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;
}
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }
  .position {
    display: flex;
    align-items: center;
    width: 74px;
    .text {
      font-size: 12px;
      color: #666;
    }
    img {
      width: 18px;
      height: 18px;
      margin-left: 4px;
    }
  }
}

.date-range {
  .start {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .stay {
    flex: 1;
    align-items: center;
    text-align: center;
    color: #303030;
  }
  .end {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tip {
    font-size: 13px;
    margin-bottom: 4px;
  }
  .time {
    font-size: 16px;
    color: #303030;
  }
}

.price-counter {
  .start {
    flex: 2;
    border-right: 1px solid var(--line-color);
  }
  .end {
    flex: 1;
    text-align: center;
  }
}

.hot-suggests {
  // display: flex;
  // flex-wrap: wrap;
  margin: 10px 0;
  height: auto; // 为了不继承 section 的高度，设置为auto

  .item {
    padding: 4px 8px;
    border-radius: 14px;
    margin: 4px;
    font-size: 12px;
  }
}

.search-btn {
  .btn {
    width: 100%;
    // width: 342px;
    height: 38px;
    max-height: 50px;
    text-align: center;
    line-height: 38px;
    // background-image: linear-gradient(90deg, #fa8c1d, #fcaf3f);
    background-image: var(--theme-linear-gradient);
    border-radius: 30px;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
  }
}
</style>

<template>
  <div class="search-box">
    <!-- 1.位置信息 -->
    <div class="location border-gray-line">
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
        <span class="time">{{ startTime }}</span>
      </div>
      <div class="stay">共{{ stayCount }}晚</div>
      <div class="end">
        <span class="tip">离店</span>
        <span class="time">{{ endTime }}</span>
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
    <div class="hot-suggests">
      <template v-for="item in hotSuggests" :key="item.tagText.text">
        <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">
          {{ item.tagText.text }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import useCityStore from '@/stores/modules/city'
import { useHomeStore } from '@/stores/modules/home'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { formatMonthDay, getDiffDays } from '@/utils/format_time'

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
const nowDate = new Date()
const newDate = new Date()
// 注意，这里不能使用nowDate，否则就把之前的nowDate改了，所以要再次 new Date()
newDate.setDate(newDate.getDate() + 1)

const startTime = ref(formatMonthDay(nowDate))
const endTime = ref(formatMonthDay(newDate))
const stayCount = ref(getDiffDays(nowDate, newDate))

// 5.选择日期区间
const showCalendar = ref(false)
const onConfirm = (value) => {
  // console.log(value, '--value--')
  // 5.1设置日期
  const selectStartDate = value[0]
  const selectEndDate = value[1]
  // console.log(selectStartDate, selectEndDate, '--value--')

  startTime.value = formatMonthDay(selectStartDate)
  endTime.value = formatMonthDay(selectEndDate)
  stayCount.value = getDiffDays(selectStartDate, selectEndDate)
  // 2.隐藏日历
  showCalendar.value = false
}

// 6.热门城市建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)
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
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  padding: 0 20px;

  .item {
    padding: 4px 8px;
    border-radius: 14px;
    margin: 4px;
    font-size: 12px;
  }
}
</style>

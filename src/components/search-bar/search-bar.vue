<template>
  <div class="search">
    <div class="select-time">
      <div class="item start">
        <div class="name">住</div>
        <div class="date">{{ startDateStr }}</div>
      </div>
      <div class="item end">
        <div class="name">离</div>
        <div class="date">{{ endDateStr }}</div>
        <i class="icon-cancel"></i>
      </div>
    </div>
    <div class="content">
      <div class="keyword">关键字/位置/民宿</div>
    </div>
    <div class="right">
      <i class="icon"></i>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '@/stores/modules/main'
import { formatMonthDay } from '@/utils/format_time'
import { storeToRefs } from 'pinia'

// import { ref, reactive } from 'vue'
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)
const startDateStr = computed(() => formatMonthDay(startDate.value, 'MM.DD'))
const endDateStr = computed(() => formatMonthDay(endDate.value, 'MM.DD'))
</script>

<style scoped lang="less">
.search {
  display: flex;
  align-items: center;
  height: 45px;
  background-color: #f2f4f6;
  border-radius: 5px;

  .select-time {
    position: relative;
    font-size: 10px;
    color: #999;
    padding: 10px;
    border-right: 1px solid #fff;

    .item {
      display: flex;
      line-height: 14px;
      .date {
        font-size: 9px;
        color: #0f0f0f;
        padding-left: 4px;
      }
    }
    .end {
      .icon-cancel {
        position: absolute;
        bottom: 10px;
        right: 0;

        width: 10px;
        height: 10px;
        display: inline-block;

        background-image: url(../../assets/img/home/home-sprite.png);
        background-position: -199px -155px;
        background-size: 207px 192px;
      }
    }
  }
  .content {
    padding-left: 10px;
    color: #999;
    font-size: 13px;
    flex: 1;
  }
  .right {
    display: flex;
    margin-top: 4px;
    margin-right: 10px;
    .icon {
      width: 24px;
      height: 24px;
      display: inline-block;

      background-image: url(../../assets/img/home/home-sprite.png);
      background-position: -31px -153px;
      background-size: 207px 192px;
    }
  }
}
</style>

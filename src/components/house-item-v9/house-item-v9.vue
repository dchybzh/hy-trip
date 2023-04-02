<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="" />
      </div>
      <div class="info">
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="houseName">{{ itemData.houseName }}</div>
        <div class="price-info">
          <van-rate v-model="value" :size="15" readonly allow-half color="#fff" />
          <div class="price">¥ {{ itemData.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// import { ref, reactive } from 'vue'
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

const value = computed(() => {
  return Number(props.itemData.commentScore)
})
</script>

<style scoped lang="less">
.house-item {
  width: 50%;
  .item-inner {
    position: relative;
    color: #fff;
    font-size: 15px;
    padding: 5px;
    .cover {
      img {
        border-radius: 10px;
        width: 100%;
      }
    }

    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 12px;
      .summary {
        margin-bottom: 10px;
      }
      .price-info {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
      .houseName {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>

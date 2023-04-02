<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData?.image?.url" alt="" />
      </div>
      <div class="info">
        <div class="location"><van-icon name="location" />{{ itemData.location }}</div>
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="houseName">{{ itemData.houseName }}</div>
        <div class="price-info">
          <div class="price">¥ {{ itemData.finalPrice }}</div>
          <div class="productPrice">¥ {{ itemData.productPrice }}</div>
          <!-- <div class="text" v-if="itemData.priceTipBadge">{{ itemData.priceTipBadge.text }}</div> -->
          <div class="text">{{ itemData?.priceTipBadge?.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, reactive } from 'vue'
defineProps({
  itemData: {
    type: Object,
    value: () => ({})
  }
})
</script>

<style scoped lang="less">
.house-item {
  width: 50%;
  .item-inner {
    // position: relative;
    font-size: 13px;
    padding: 5px;
    .cover {
      img {
        border-radius: 10px;
        width: 100%;
      }
    }
    .info {
      padding: 0 10px;

      .location {
        padding-top: 10px;
        color: #666;
        margin-bottom: 5px;
      }
      .summary {
        color: #666;
        margin-bottom: 8px;
      }
      .houseName {
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price-info {
        display: flex;
        align-items: center;
        margin-top: 8px;
        .price {
          color: var(--primary-color);
          padding-right: 5px;
          font-size: 15px;
        }
        .productPrice {
          padding-right: 5px;
          font-size: 12px;
          color: #999;
          text-decoration: line-through;
        }
        .text {
          font-size: 12px;
          padding: 0 3px;
          color: #fff;
          border-radius: 15px;
          background-image: linear-gradient(90deg, rgb(252, 130, 151), rgb(255, 49, 49));
        }
      }
    }
  }
}
</style>

<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in houseList" :key="item.data.houseId">
        <!-- 给组件绑定事件，本质是绑定到根元素上的，看你组件里有没有多个根节点，如果只有一个根节点就可以绑定 -->
        <house-item-v9 v-if="item.discoveryContentType === 9" :item-data="item.data" @click="itemClick(item.data)" />
        <house-item-v3 v-if="item.discoveryContentType === 3" :item-data="item.data" @click="itemClick(item.data)" />
      </template>
    </div>
  </div>
</template>

<script setup>
// import { ref, reactive } from 'vue'
import HouseItemV9 from '@/components/house-item-v9/house-item-v9.vue'
import HouseItemV3 from '@/components/house-item-v3/house-item-v3.vue'
import { useHomeStore } from '@/stores/modules/home'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)

const router = useRouter()
const itemClick = (item) => {
  // console.log('item---', item.houseId)
  // 跳转到 Detail 页面
  router.push('/detail/' + item.houseId)
}
</script>

<style scoped lang="less">
.content {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>

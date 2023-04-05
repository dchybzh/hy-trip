<template>
  <div class="tab-control">
    <van-tabs v-model:active="active" @click-tab="onTabclick">
      <template v-for="(item, index) in title" :key="index">
        <van-tab :title="item"></van-tab>
      </template>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  title: {
    type: Array,
    default: () => []
  }
})
let active = ref(0)

const emit = defineEmits(['onTabclick'])
const onTabclick = () => {
  // console.log(active.value, '-----active.value')
  const index = active.value
  // console.log(index, '--index--')
  emit('onTabclick', index)
}
const setActive = (index) => {
  active.value = index
}

//暴露setActive方法，使父组件可以使用
defineExpose({
  setActive
})
</script>

<style scoped lang="less"></style>

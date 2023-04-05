<template>
  <div class="map">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<script setup lang="ts">
import DetailSection from '@/components/detail-section/detail-section.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})
const mapRef = ref()
// const longitude = props.mapData.longitude
// const latitude = props.mapData.latitude
onMounted(() => {
  var map = new BMapGL.Map(mapRef.value) // 创建地图实例
  var point = new BMapGL.Point(props.position.longitude, props.position.latitude) // 创建点坐标 经度 纬度
  map.centerAndZoom(point, 15) // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
  var marker = new BMapGL.Marker(point) // 创建标注

  map.addOverlay(marker) // 将标注添加到地图中
})
</script>

<style scoped lang="less">
.baidu {
  height: 200px;
}
</style>

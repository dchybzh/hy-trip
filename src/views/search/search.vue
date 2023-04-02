<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="search">
    <h2>开始时间:{{ $route.query.startTime }}</h2>
    <h2>结束时间:{{ $route.query.endTime }}</h2>
    <h2>城市:{{ $route.query.currentCity }}</h2>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'
</script>

<style scoped lang="less"></style>

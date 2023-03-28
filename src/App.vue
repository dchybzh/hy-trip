<template>
  <div class="app">
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import TabBar from '@/components/tab-bar/tab-bar.vue'
</script>

<style scoped lang="less"></style>

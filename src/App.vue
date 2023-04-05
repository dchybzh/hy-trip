<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive include="home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <tab-bar v-show="!route.meta.hideTabBar"></tab-bar>
    <Loading></Loading>
    <!-- <tab-bar></tab-bar> -->
  </div>
</template>

<script setup>
// import { ref, reactive } from 'vue'
import TabBar from '@/components/tab-bar/tab-bar.vue'
import Loading from './components/loading/loading.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped lang="less"></style>

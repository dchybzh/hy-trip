<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="navBar">
    <div class="title">弘源旅途</div>
  </div>
</template>

<script setup></script>

<style scoped lang="less">
.navBar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  border-bottom: 1px solid #f2f2ff;
  .title {
    color: var(--primary-color);
    font-size: 16px;
    font-weight: 600;
  }
}
</style>

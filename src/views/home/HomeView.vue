<script setup lang="ts">
import SideMenu from './modules/SideMenu.vue';
import TopBar from './modules/TopBar.vue';
import TabBar from './modules/TabBar.vue';
import ContentWrapper from './modules/ContentWrapper.vue';
</script>

<template>
  <div class="relative w-full h-100vh flex">
    <SideMenu></SideMenu>
    <div class="flex-grow-1 min-w-content">
      <TopBar class="h-top-bar bg-second-primary"></TopBar>
      <TabBar class="h-tab-bar bg-#fff"></TabBar>
      <ContentWrapper class="h-content-wrapper bg-#f0f2f5">
      </ContentWrapper>
    </div>
  </div>
</template>

<style scoped>
</style>

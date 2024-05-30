<script setup lang="ts">
import { type GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
      // primaryColor: '#18a058'
  },
  Tabs: {
    "tabGapSmallCard": "0",
    "tabBorderRadius": "0",
    "tabColor": "#fff"
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <RouterView />
  </n-config-provider>
</template>

<style scoped>
</style>

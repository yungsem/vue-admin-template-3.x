<script setup lang="ts">
import { ref, onUpdated, onMounted } from 'vue'
import { ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5'
import { useTabBarStore } from '@/stores/TabBar'
import { useSideMenuStore } from '@/stores/SideMenu'

// pinia 数据
const tabBarStore = useTabBarStore();
const sideMenuStore = useSideMenuStore();

// 常量
let scrollLeftRefX = 0
let scrollRightRefX = 0

onUpdated(() => {
  const activeTabHtml = document.querySelector("div[data-name='"+ tabBarStore.activeTabKey + "']")
  const activeTabWidth = activeTabHtml == null? 0 : activeTabHtml.clientWidth
  const activTabRight = activeTabHtml? activeTabHtml.getBoundingClientRect().right : 0
  const activTabX = activeTabHtml? activeTabHtml.getBoundingClientRect().x : 0;
  const rightDiff = scrollRightRefX - activTabRight
  const leftDiff = activTabX-scrollLeftRefX

  if (rightDiff < 0) {
    scrollToRight(-rightDiff + 0.8 * activeTabWidth)
  } else if (rightDiff < 30) {
    scrollToRight(1.8 * activeTabWidth)
  }

  if (leftDiff < 0) {
    scrollToLeft(-leftDiff + 0.8 * activeTabWidth)
  } else if (leftDiff < 30) {
    scrollToLeft(1.8 * activeTabWidth)
  }
})

const scrollLeftRef = ref<HTMLElement | null>(null)
const scrollRightRef = ref<HTMLElement | null>(null)
onMounted(() => {
  scrollLeftRefX = scrollLeftRef.value? scrollLeftRef.value.getBoundingClientRect().right : 0
  scrollRightRefX = scrollRightRef.value? scrollRightRef.value.getBoundingClientRect().x : 0
})

const tabConent = ref<HTMLElement | null>(null)
function scrollToLeft(width : number) {
  tabConent.value?.children[0].children[0].children[0].children[0].scrollBy({
    left: -width,
    behavior: 'smooth'
  })
}

function scrollToRight(width: number) {
  tabConent.value?.children[0].children[0].children[0].children[0].scrollBy({
    left: width,
    behavior: 'smooth'
  })
}

function handleUpdateValue(menuKey:string) {
  sideMenuStore.openMenuFromTab(menuKey)
}

function handleClose(menuKey:string) {
  const menuKeyIndex = tabBarStore.tabKeyList.indexOf(menuKey)
  if (menuKey == tabBarStore.activeTabKey) {
    // 关闭的是正在打开的 tab
    // 需要将其左侧相邻的 tab 打开
    const rightSublingKey = tabBarStore.tabKeyList[menuKeyIndex + 1]
    if (rightSublingKey) {
      tabBarStore.activeTabKey = rightSublingKey
      handleUpdateValue(rightSublingKey)
    } else {
      const leftSublingKey = tabBarStore.tabKeyList[menuKeyIndex - 1]
      tabBarStore.activeTabKey = leftSublingKey
      handleUpdateValue(leftSublingKey)
    }
    tabBarStore.tabKeyList.splice(menuKeyIndex, 1)
    tabBarStore.tabMap.delete(menuKey)
  } else {
    // 从 tabBarStore.tabKeyList 和 tabBarStore.tabMap 删除该 tab
    tabBarStore.tabKeyList.splice(menuKeyIndex, 1)
    tabBarStore.tabMap.delete(menuKey)
  }
}

</script>
<template>
  <div class="tab-bar flex items-center justify-between">
    <div ref="scrollLeftRef" class="tab-left hover:cursor-pointer" @click="scrollToLeft(250)">
      <n-icon class=" h-tab-bar w-tab-switch flex items-center justify-center" size="16">
        <ChevronBackOutline />
      </n-icon>
    </div>
    <div class="tab-content min-w-tab-bar" ref="tabConent">
      <n-tabs
        size="small"
        type="card"
        v-model:value="tabBarStore.activeTabKey"
        @update:value="handleUpdateValue"
        @close="handleClose"
        closable
      >
        <n-tab
          :closable="entry[0] !== '/home-board'"
          v-for="entry in tabBarStore.tabMap.entries()"
          :key="entry[0]"
          :tab="entry[1]"
          :name="entry[0]"
        >
        </n-tab>
    </n-tabs>
    </div>
    <div ref="scrollRightRef"  class="tab-right hover:cursor-pointer" @click="scrollToRight(250)">
      <n-icon class=" h-tab-bar w-tab-switch flex items-center justify-center" size="16">
        <ChevronForwardOutline />
      </n-icon>
    </div>
  </div>
</template>

<style>
.tab-left {
  border-left: 1px solid var(--tab-item-bg-color);
}
.tab-right {
  border-left: 1px solid var(--tab-item-bg-color);
}
.n-tabs-pad {
  border: 0 !important;
}
.n-tabs-tab {
  min-width: 64px;
  height: 30px;
  border: 0!important;
  border-left: 1px solid var(--tab-item-bg-color)!important;
}
.n-tabs-tab:hover {
  background-color: var(--tab-item-bg-color) !important;
}
.n-tabs-tab--active {
  background-color: var(--tab-item-bg-color) !important;
}
</style>
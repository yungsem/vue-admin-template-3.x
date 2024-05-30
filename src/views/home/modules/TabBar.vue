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
  // TabBar 组件有更新，表示最新选中的 tab 有变化，无论是鼠标直接点击 tab 造成的变化，
  // 还是新打开一个 tab 造成的变化，处理逻辑一致
  // 最新打开的 tab ，在 tabBarStore.tabKeyList 里的位置
  // 打开的 tab 连同其左侧的 tab ，总长度
  const activeTabHtml = document.querySelector("div[data-name='"+ tabBarStore.activeTabKey + "']")
  const activTabX = activeTabHtml? activeTabHtml.getBoundingClientRect().x : 0;
  const rightDiff = scrollRightRefX - activTabX
  const leftDiff = activTabX-scrollLeftRefX
  if (rightDiff < 200) {
    scrollToRight()
  }
  if (leftDiff < 200) {
    scrollToLeft()
  }
})

const scrollLeftRef = ref<HTMLElement | null>(null)
const scrollRightRef = ref<HTMLElement | null>(null)
onMounted(() => {
  scrollLeftRefX = scrollLeftRef.value? scrollLeftRef.value.getBoundingClientRect().x : 0
  scrollRightRefX = scrollRightRef.value? scrollRightRef.value.getBoundingClientRect().x : 0
})

const tabConent = ref<HTMLElement | null>(null)
function scrollToLeft() {
  tabConent.value?.children[0].children[0].children[0].children[0].scrollBy({
    left: -250,
    behavior: 'smooth'
  })
}

function scrollToRight() {
  tabConent.value?.children[0].children[0].children[0].children[0].scrollBy({
    left: 250,
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
    <div ref="scrollLeftRef" class="tab-left hover:cursor-pointer" @click="scrollToLeft">
      <n-icon class=" h-tab-bar w-tab-bar-switch flex items-center justify-center" size="16">
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
    <div ref="scrollRightRef"  class="tab-right hover:cursor-pointer" @click="scrollToRight">
      <n-icon class=" h-tab-bar w-tab-bar-switch flex items-center justify-center" size="16">
        <ChevronForwardOutline />
      </n-icon>
    </div>
  </div>
</template>

<style>
.tab-right {
  border-left: 1px solid #f0f2f5;
}
.n-tabs-pad {
  border: 0 !important;
}
.n-tabs-tab {
  min-width: 64px;
  height: 30px;
  border: 0!important;
  border-left: 1px solid #f0f2f5 !important;
}
.n-tabs-tab:hover {
  background-color: #f0f2f5 !important;
}
.n-tabs-tab--active {
  background-color: #f0f2f5 !important;
}
</style>
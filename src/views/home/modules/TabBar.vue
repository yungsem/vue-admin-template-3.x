<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import { ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5'
import { useTabBarStore } from '@/stores/TabBar'
import { useSideMenuStore } from '@/stores/SideMenu'

const tabBarStore = useTabBarStore();
const sideMenuStore = useSideMenuStore();

const scrollFlag = ref(false)

const tabConent = ref<HTMLInputElement | null>(null)

onUpdated(() => {
  autoScoll()
})

function autoScoll() {
  const scrollRef = tabConent.value?.children[0].children[0].children[0].children[0]
  const clientWidth = scrollRef?.clientWidth ? scrollRef?.clientWidth : 0
  const scrollWidth = scrollRef?.scrollWidth ? scrollRef?.scrollWidth : 0
  if (scrollWidth !== clientWidth) {
    scrollFlag.value = true
    scrollRef?.scrollBy({
      left: 250,
      behavior: 'smooth'
    })
  } else {
    scrollFlag.value = false
  }
}

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
  } else {
    // 从 tabBarStore.tabKeyList 和 tabBarStore.tabMap 删除该 tab
    tabBarStore.tabKeyList.splice(menuKeyIndex, 1)
    tabBarStore.tabMap.delete(menuKey)
    autoScoll()
  }
}

</script>
<template>
  <div class="tab-bar flex items-center justify-between">
    <div v-if="scrollFlag" class="tab-left hover:cursor-pointer" @click="scrollToLeft">
      <n-icon class=" h-tab-bar w-tab-bar-switch flex items-center justify-center" size="16">
        <ChevronBackOutline />
      </n-icon>
    </div>
    <div class="tab-content min-w-tab-bar max-w-tab-bar" ref="tabConent">
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
    <div v-if="scrollFlag" class="tab-right hover:cursor-pointer" @click="scrollToRight">
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
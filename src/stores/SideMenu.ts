import { defineStore } from 'pinia'
import { ref} from 'vue'
import type { MenuInst } from 'naive-ui'

export const useSideMenuStore = defineStore('sideMenu', () => {
  
  // collapsed: 收缩菜单侧边栏的开关
  const collapsed = ref(false)

  const expandedKeys = ref<string[]>(['/home-board'])

  // 菜单的引用
  const menuInstRef = ref<MenuInst | null>(null)

  const selectedKey = ref<string|undefined>('/home-board')

  // 从标签页打开菜单
  function openMenuFromTab(menuKey : string) {
    selectedKey.value = menuKey
    menuInstRef.value?.showOption(menuKey)
    if (menuKey == '/home-board') {
      expandedKeys.value = []
    }
  }

  // 返回
  return { collapsed, selectedKey, expandedKeys,  menuInstRef, openMenuFromTab }
})



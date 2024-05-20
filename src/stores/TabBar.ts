import { defineStore } from 'pinia'
import { reactive, ref} from 'vue'

export const useTabBarStore = defineStore('tabBar', () => {
  
  const tabMap = reactive<Map<string, string>>(new Map())

  const tabKeyList:string[] = []

  const activeTabKey = ref<string>('')

  function addTab(menuKey : string, menuLabel: string|any) {
    tabMap.set(menuKey, menuLabel)
    activeTabKey.value = menuKey
    if (tabKeyList.indexOf(menuKey) == -1) {
      tabKeyList.push(menuKey)
    }
  }

  return { tabMap, tabKeyList, activeTabKey, addTab }
})

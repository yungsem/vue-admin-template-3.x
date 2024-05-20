<script setup lang="ts">
import { MenuOutline, LanguageOutline, ChevronDownOutline, PersonCircleOutline } from '@vicons/ionicons5'
import { useSideMenuStore } from '@/stores/SideMenu'

const sideMenuStore = useSideMenuStore()

interface DropDownOPtion {
  label: string;
  key: string;
}

const langOptions: DropDownOPtion[] = [
  {
    label: "中文简体",
    key: "zh-CN"
  },
  {
    label: "中文繁体",
    key: "zh-TW"
  },
  {
    label: "English",
    key: "en"
  }
]

const siteOptions: DropDownOPtion[] = [
  {
    label: "苏州01厂",
    key: "S01"
  },
  {
    label: "苏州06厂",
    key: "S06"
  }
]

const userOptions: DropDownOPtion[] = [
  {
    label: "修改密码",
    key: "changePwd"
  },
  {
    label: "退出登录",
    key: "logout"
  }
]

function collapseMenu() {
  sideMenuStore.collapsed = !sideMenuStore.collapsed
}
</script>
<template>
  <div class="top-bar flex items-center justify-between">
    <div class="top-bar-left flex items-center">
      <div @click="collapseMenu" class="h-top-bar w-menu-switch hover:bg-hover hover:cursor-pointer flex items-center justify-center c-#eee" >
        <n-icon size="28">
          <MenuOutline />
        </n-icon>
      </div>
    </div>
    <div class="top-bar-right flex items-center justify-end">
      <n-dropdown trigger="click" :options="langOptions">
        <div class="h-top-bar w-menu-switch hover:bg-hover hover:cursor-pointer flex items-center justify-center c-#eee">
          <n-icon size="18">
            <LanguageOutline />
          </n-icon>
        </div>
      </n-dropdown>
      <n-dropdown trigger="click" :options="siteOptions">
        <div class="h-top-bar hover:bg-hover hover:cursor-pointer flex items-center justify-center c-#eee pl-10px pr-10px">
          <span class="mr-6px">苏州01厂</span>
          <n-icon size="16">
            <ChevronDownOutline />
          </n-icon>
        </div>
      </n-dropdown>
      <n-dropdown trigger="click" :options="userOptions">
        <div class="h-top-bar hover:bg-hover hover:cursor-pointer flex items-center justify-center c-#eee pl-10px pr-10px">
          <n-icon size="28">
            <PersonCircleOutline />
          </n-icon>
          <div class="ml-6px">管理员</div>
        </div>
      </n-dropdown>
    </div>
  </div>
</template>
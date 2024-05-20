<script setup lang="ts">
import { h, type Component ,ref, onMounted } from 'vue'
import { NIcon, type MenuOption, type MenuInst } from 'naive-ui'
import { SettingsOutline, PersonOutline, MenuOutline, HomeOutline } from '@vicons/ionicons5'
import { $t } from '@/i18n/i18n';
import { useRouter } from 'vue-router'
import { useTabBarStore } from '@/stores/TabBar'
import { useSideMenuStore } from '@/stores/SideMenu'

const tabBarStore = useTabBarStore();

// sideMenuStore ，控制侧边菜单栏展开或收缩 
const sideMenuStore = useSideMenuStore();

// 数据：菜单数据
const menuOptions: MenuOption[] = [
  {
    label: $t("MDM_HOME"),
    key: '/home-board',
    icon: renderIcon(HomeOutline),
  },
  {
    label: $t("MDM_SYSTEM_MANAGEMENT"),
    key: '/system-management',
    icon: renderIcon(SettingsOutline),
    children: [
      {
        label: $t("MDM_USER_MANAGEMENT"),
        key: '/user-management',
        icon: renderIcon(PersonOutline),
        children: [
          {
            label: $t("MDM_MENU_MANAGEMENT"),
            key: '/menu-management-s1',
            icon: renderIcon(MenuOutline),
          },
          {
            label: $t("MDM_MENU_MANAGEMENT"),
            key: '/menu-management-s2',
            icon: renderIcon(MenuOutline),
          },
        ]
      },
      {
        label: $t("MDM_MENU_MANAGEMENT"),
        key: '/menu-management',
        icon: renderIcon(MenuOutline),
      }
    ]
  },
  {
    label: $t("MDM_SYSTEM_MANAGEMENT"),
    key: '/system-management2',
    icon: renderIcon(SettingsOutline),
    children: [
      {
        label: $t("MDM_USER_MANAGEMENT"),
        key: '/user-management2',
        icon: renderIcon(PersonOutline),
      },
      {
        label: $t("MDM_MENU_MANAGEMENT"),
        key: '/menu-management2',
        icon: renderIcon(MenuOutline),
      }
    ]
  },
  {
    label: $t("MDM_SYSTEM_MANAGEMENT"),
    key: '/system-management3',
    icon: renderIcon(SettingsOutline),
    children: [
      {
        label: $t("MDM_USER_MANAGEMENT"),
        key: '/user-management3',
        icon: renderIcon(PersonOutline),
      },
      {
        label: $t("MDM_MENU_MANAGEMENT"),
        key: '/menu-management3',
        icon: renderIcon(MenuOutline),
      }
    ]
  },
  {
    label: $t("MDM_SYSTEM_MANAGEMENT"),
    key: '/system-management4',
    icon: renderIcon(SettingsOutline),
    children: [
      {
        label: $t("MDM_USER_MANAGEMENT"),
        key: '/user-management4',
        icon: renderIcon(PersonOutline),
      },
      {
        label: $t("MDM_MENU_MANAGEMENT"),
        key: '/menu-management4',
        icon: renderIcon(MenuOutline),
      }
    ]
  },
  {
    label: $t("MDM_SYSTEM_MANAGEMENT"),
    key: '/system-management5',
    icon: renderIcon(SettingsOutline),
    children: [
      {
        label: $t("MDM_USER_MANAGEMENT"),
        key: '/user-management5',
        icon: renderIcon(PersonOutline),
      },
      {
        label: $t("MDM_MENU_MANAGEMENT"),
        key: '/menu-management5',
        icon: renderIcon(MenuOutline),
      }
    ]
  },
  {
    label: $t("MDM_SYSTEM_MANAGEMENT"),
    key: '/system-management6',
    icon: renderIcon(SettingsOutline),
    children: [
      {
        label: $t("MDM_USER_MANAGEMENT"),
        key: '/user-management6',
        icon: renderIcon(PersonOutline),
      },
      {
        label: $t("MDM_MENU_MANAGEMENT"),
        key: '/menu-management6',
        icon: renderIcon(MenuOutline),
      }
    ]
  },
]

// 菜单引用
const menuInstRef = ref<MenuInst | null>(null)
onMounted(() => {
  sideMenuStore.menuInstRef = menuInstRef.value
})

// 首次加载显示首页
const router = useRouter();
router.push('/home-board');
tabBarStore.addTab('/home-board', $t("MDM_HOME"));

// 选中菜单，增加一个标签
function handleUpdateValue(key: string, item: MenuOption) {
  tabBarStore.addTab(key, item.label);
}

function handleUpdateExpandedKeys(keys: string[]) {
  sideMenuStore.expandedKeys = keys
}

// 方法：渲染菜单图标
function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

</script>
<template>
  <div class="menu">
    <n-layout has-sider>
      <n-layout-sider
          collapse-mode="width"
          :collapsed-width="60"
          :width="220"
          :collapsed="sideMenuStore.collapsed"
        >
        <div class="h-top-bar bg-primary"></div>
        <div class="h-menu overflow-y-auto">
          <n-menu
            ref="menuInstRef"
            v-model:value="sideMenuStore.selectedKey"
            :collapsed="sideMenuStore.collapsed"
            :collapsed-width="60"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :expanded-keys="sideMenuStore.expandedKeys"
            accordion
            :indent="12"
            @update:value="handleUpdateValue"
            @update:expanded-keys="handleUpdateExpandedKeys"
          />
        </div>
      </n-layout-sider>
    </n-layout>
  </div>
</template>@/stores/SideMenu
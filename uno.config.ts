// uno.config.ts
import { defineConfig } from 'unocss'
// 官方 preset
import presetUno from '@unocss/preset-uno';

export default defineConfig({
  presets: [
    presetUno(),
  ],
  theme: {
    colors: {
      'login': '#222d32',
      'login-card': '#fff',
      'primary': '#004478',
      'second-primary': '#005087',
      'hover': '#1D6F9F'
    },
    width: {
      'login-card': '440px',
      'menu': '220px',
      'menu-switch': '40px',
      'tab-bar-switch': '30px',
    },
    maxWidth: {
      'login-card': '440px',
      'tab-bar': 'calc(100% - 0px)',
    },
    minWidth: {
      'content': 'calc(100% - 220px)',
      'tab-bar': 'calc(100% - 61px)',
    },
    height: {
      'login-card': '350px',
      'top-bar': '40px',
      'tab-bar': '30px',
      'menu': 'calc(100vh - 40px)',
      'content-wrapper': 'calc(100vh - 70px)'
    }
  }
})
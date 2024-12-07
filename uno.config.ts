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
      'top-bar': 'var(--top-bar-bg-color)',
      'top-bar-t': 'var(--top-bar-text-color)',
      'top-bar-hover': 'var(--top-bar-hover-color)',

      'tab-bar': 'var(--tab-bar-bg-color)',
      'content-wrapper': 'var(--content-wrapper-bg-color)',
      'logo': 'var(--logo-bg-color)',
    },
    width: {
      'menu-switch': 'var(--menu-switch-width)',
      'language-switch': 'var(--language-switch-width)',
      'site-switch': 'var(--site-switch-width)',
      'user-switch': 'var(--user-switch-width)',
      'tab-switch': 'var(--tab-switch-width)',
    },
    maxWidth: {
    },
    minWidth: {
      'side-content': 'calc(100% - var(--side-menu-width))',
      'tab-bar': 'calc(100% - var(--tab-switch-width)*2 - 1px)',
    },
    height: {
      'top-bar': 'var(--top-bar-height)',
      'tab-bar': 'var(--tab-bar-height)',
      'menu': 'calc(100vh - var(--top-bar-height))',
      'content-wrapper': 'calc(100vh - var(--top-bar-height) - var(--tab-bar-height))'
    }
  }
})
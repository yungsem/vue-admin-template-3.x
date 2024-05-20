import { createI18n } from 'vue-i18n';
import zhCN from './locales/zh-cn';
import enUS from './locales/en-us';

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
};

const i18n = createI18n({
  // locale: 'en-US',
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages,
  legacy: false
});

export const $t : any = i18n.global.t;

export default i18n;
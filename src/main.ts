import './assets/main.css'
import 'uno.css';

// 引入自定义的 CSS 变量
import "./assets/variable.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import i18n from './i18n/i18n'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 导入特效组件库
import EffectsPlugin from './effects'

const app = createApp(App)

// 注册特效组件
app.use(EffectsPlugin)

app.mount('#app')

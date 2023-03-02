import { createApp } from 'vue'
// eslint-disable-next-line no-unused-vars
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router/index'
import api from "@/axios/api";
import deCss from './CSS/index.css'
import * as echarts from 'echarts';
import 'video.js/dist/video-js.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(echarts)
app.use(deCss)
app.use(ElementPlus)
app.use(router)
app.use(api)

app.mount('#app')
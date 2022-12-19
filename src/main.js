import { createApp } from 'vue'
import router from '../src/router'
import { createPinia } from 'pinia'
import App from './App.vue'
import VWave from 'v-wave'

import './assets/css/index.css'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(VWave, {
    initialOpacity: 0.6,
    easing: 'ease-in',
    duration: 0.3
})

app.mount('#app')

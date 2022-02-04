import { createApp, VueElement } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.config.globalProperties.$globals = {
    bulletNames: ["A", "B", "C", "D", "E", "F", "G"],
    borders: false,
};

app.mount('#app')

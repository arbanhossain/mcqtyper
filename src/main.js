import { createApp, VueElement } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.config.globalProperties.$globals = {
    bulletNames: ["A", "B", "C", "D", "E", "F", "G"],
    borders: false,
    imgfolder: "file:///E:/qsn/images/",
    imgDelimiter: '!',
    imgPattern: /!(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})!/g,
    imgReplaceClasses: '.statement, .choices, .solution',
};

app.mount('#app')

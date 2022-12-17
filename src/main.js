import { createApp } from 'vue'
import App from './App.vue'
import DropZone from 'dropzone-vue';
import 'dropzone-vue/dist/dropzone-vue.common.css';
createApp(App)
.use(DropZone)
.mount('#app')

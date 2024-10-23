import 'animate.css';
import Antd from 'ant-design-vue';
import { MotionPlugin } from '@vueuse/motion';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style/index.scss';
/* webcontainer */
// import './webcontainer/webcontainer';
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(MotionPlugin);
app.use(Antd);
app.use(router);
app.use(pinia);
app.mount('#app');

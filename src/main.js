import { createApp } from 'vue';
import windows from './windows.vue';
import cookies from 'vue-cookies';
import naive from "naive-ui";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { isWap } from './untils/Iswap';
import Android from './Android.vue'
const wap = isWap();

if(!wap){
    const app = createApp(windows);
    app.config.globalProperties.$cookies = cookies;
app.config.globalProperties.$cookies.config('1d');

app.use(naive);
app.use(ElementPlus)

app.mount('#app');
}else{
    const app = createApp(Android);
    app.config.globalProperties.$cookies = cookies;
app.config.globalProperties.$cookies.config('1d');

app.use(naive);
app.use(ElementPlus)

app.mount('#app');
}




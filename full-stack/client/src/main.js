import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/untils/axios' // 导入执行axios文件
import '@/mockjs/index.js' // 导入执行mockjs文件
import '@/permission.js' // 导入执行permission.js文件

// 全局引入element-ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 全局使用element-ui组件
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

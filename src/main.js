import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/gloable.css'
import request from "@/utils/request";
import moment from 'moment'
Vue.use(ElementUI,{size:"mini"});
Vue.prototype.$moment=moment
Vue.config.productionTip = false

Vue.prototype.request=request

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

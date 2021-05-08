import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import store from './store/index'
import FastClick from 'fastclick'

import toast from 'components/common/toast'
Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading:require('assets/img/common/vea.png')
});
Vue.use(toast)

// 解决移动端300ms的言延迟
FastClick.attach(document.body);

Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

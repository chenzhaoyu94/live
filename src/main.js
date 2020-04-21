import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

import './styles/index.less'

Vue.config.productionTip = false

Vue.prototype.$video = Video

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'

import drawEachDay from '@/plugins/draw-each-day'

Vue.use(drawEachDay);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

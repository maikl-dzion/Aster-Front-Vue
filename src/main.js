import Vue    from 'vue'
import App    from './App.vue'
import router from './router'
import store  from './store'
import http   from './services/http'
import services   from './services/services'
import crudService   from './services/crud_service'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// import 'vue-material/dist/theme/default-dark.css'

Vue.mixin(http);
Vue.mixin(services);
Vue.mixin(crudService);
Vue.use(VueMaterial);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

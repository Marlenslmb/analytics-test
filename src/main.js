import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router';
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true;

const vuetify = createVuetify({
  components,
  directives,
})
createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')

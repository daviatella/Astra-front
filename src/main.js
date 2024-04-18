/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import { createPinia } from 'pinia'
import router from './routes.js'
import PrimeVue from 'primevue/config';
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia()
app.use(Buefy);
app.use(pinia)
app.use(router)
app.use(PrimeVue);
registerPlugins(app)

app.mount('#app')

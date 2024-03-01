/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(Buefy);
registerPlugins(app)

app.mount('#app')

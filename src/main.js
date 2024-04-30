import { registerPlugins } from '@/plugins'
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import { createPinia } from 'pinia'
import router from './routes.js'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import { createApp } from 'vue'

const app = createApp(App)

app.config.productionTip = false;

app.config.devtools = false;
const pinia = createPinia()
app.use(Buefy);
app.use(pinia)
app.use(router)
app.use(PrimeVue);

registerPlugins(app)

app.mount('#app')

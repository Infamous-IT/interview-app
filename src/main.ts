import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './firebase';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from "@/stores";
import primeVueConfig from './config/primevue-config';
import registerPrimeVueComponents from './plugins/primevue-components';
import tooltipDirective from './directives/tooltip';
import { registerServices } from './plugins/services';

const app = createApp(App)
app.use(router);
app.use(pinia);
app.use(primeVueConfig);
registerServices(app);
registerPrimeVueComponents(app);
tooltipDirective.install(app);

app.mount('#app');

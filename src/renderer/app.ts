import { createApp } from 'vue'
import { createPinia } from 'pinia'
require('@fortawesome/fontawesome-free/js/all'); // NOTE: Required for icons to work

import App from './app.vue';

const app = createApp(App)

app.use(createPinia())
app.mount('#app')

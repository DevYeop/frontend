import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'vue-awesome-paginate/dist/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueAwesomePaginate from 'vue-awesome-paginate';
import VueExcelEditor from 'vue3-excel-editor';

import App from './App.vue';
import vuetify from './plugins/vuetify';

import router from './router';

const app = createApp(App);

app.use(VueExcelEditor);

app.use(vuetify);

app.use(VueAwesomePaginate);
app.use(createPinia());
app.use(router);

app.mount('#app');

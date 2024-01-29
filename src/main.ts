
// https://ionic.io/ionicons
// https://medium.com/@anmol.sinha1993/configure-angular-ionic-apps-with-open-ssl-certificate-to-run-them-securely-over-https-locally-4b2cd3ba3fc9
  
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import BootstrapVue3  from 'bootstrap-vue-3'
import  BootstrapVueIcons  from 'bootstrap-vue-3'
 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap-icons/font/bootstrap-icons.css'



import mqttVueHook from 'mqtt-vue-hook'
import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App)

app.use(IonicVue);
app.use(router);   
app.provide('emitter', emitter);

app.use(mqttVueHook, 'wss://broker.hivemq.com:8884/mqtt', { // Dirección segura WebSocket mqtt
// app.use(mqttVueHook, 'ws://classpip.upc.edu:8000/mqtt', {
// app.use(mqttVueHook, 'mqtt://localhost:8083', {
// app.use(mqttVueHook, 'mqtt://192.168.1.46:8000', {
// app.use(mqttVueHook, 'mqtt://192.168.137.1:8000', {
   clean: true,
   keepalive: 60,
   //clientId: 'MobileAppDEE',
   clientId: undefined,
   connectTimeout: 4000, 
   username: 'dronsEETAC',
   password: 'mimara1456.'
})

router.isReady().then(() => {
  app.use(BootstrapVue3)
  app.use(BootstrapVueIcons)
  app.mount('#app');
});



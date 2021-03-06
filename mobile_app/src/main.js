// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// import sass/css frameworks globaly from node_modules
import "bulma"

// import global scss files
import "./assets/style/scss/settings.scss";

// components used by the router are in the router/index.js
import router from './router'

// static components not used by router
import AppNav from './components/App-Nav/App-Nav.vue'

// language support
import AppLanguageService from './modules/App-LanguageService/App-LanguageService.js'
const languageService = new AppLanguageService();
languageService.init('de');

// mqtt service init
import AppMQTTService from './modules/App-MQTT-Service/App-MQTT-Service.js'
const mqttService = new AppMQTTService();
mqttService.init();

/* eslint-disable no-new */
new Vue({
    router,
    template: '<div id="app"><app-nav></app-nav><router-view></router-view></div>',
    components: {
        AppNav
    }
}).$mount('#app')
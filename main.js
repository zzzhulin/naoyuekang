import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store' // store
import plugins from './plugins' // plugins
import * as filters from './filters'; // filters
// import './permission' // permission
Vue.use(plugins)
Vue.use(uView)

Vue.config.productionTip = false
Vue.prototype.$store = store

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});

App.mpType = 'app'

const app = new Vue({
	...App
})

app.$mount()
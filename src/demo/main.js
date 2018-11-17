import '@babel/polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
import Motion from '~/dist/motion.min.js'

Vue.config.productionTip = false

Vue.use(Motion)

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})

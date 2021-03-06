import '@babel/polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'
//import Motion from '~/dist/motion.min.js'
import Motion from '@morlz/motion'

Vue.config.productionTip = false

Vue.use(Motion, {
	quasar: true
})

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})

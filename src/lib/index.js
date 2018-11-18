//import '@babel/polyfill'
import * as _directives from './directives'
import store from './directives/MotionStore'
import { waitForCreate } from './utils'

export default {
	install (Vue, options) {
		let directives = { ..._directives }

		Vue.prototype.$motion = {}

		Object
			.keys(directives)
			.map(directive => Vue.directive(directive, directives[directive]))

		Vue.mixin({
			async beforeRouteUpdate(to, from, next) {
				if (!this.__motionInjected)
					return next()

				await store.resolve(name)
				next()

				await waitForCreate(this)
  				this.$nextTick(e => this.$emit('motion:show'))
			},
			beforeRouteLeave (to, from, next) {
				if (this.__motionInjected) {
					this.$once('motion:hided', e => next())
					this.$emit('motion:hide')
				} else
					next()
			}
		})
	}
}

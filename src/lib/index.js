//import '@babel/polyfill'
import * as _directives from './directives'
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
				next()

				if (!this.__motionInjected) return
				await waitForCreate(this)
  				this.$nextTick(e => this.$emit('motion:show'))
			},
			beforeRouteLeave (to, from, next) {
				if (this.__motionInjected) {
					this.$emit('motion:hide')
					setTimeout(() => next(), 400)
				} else
					next()
			}
		})
	}
}

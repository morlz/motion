//import '@babel/polyfill'
import * as _directives from './directives'

export default {
	install (Vue, options) {
		let directives = { ..._directives }

		Vue.prototype.$motion = {}

		Object
			.keys(directives)
			.map(directive => Vue.directive(directive, directives[directive]))

		Vue.mixin({
			beforeRouteUpdate(to, from, next) {
				if (this.__motionInjected)
  					this.$nextTick(e => this.$emit('motion:show'))

				next()
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

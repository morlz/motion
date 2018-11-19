//import '@babel/polyfill'
import * as _directives from './directives'
import store from './directives/MotionStore'
import { waitForCreate } from './utils'
import { easing } from 'popmotion'

const defaultOptions = {
	duration: 375,
	quasar: false,
	easing: easing.cubicBezier(.4, .0, .2, 1)
}

export default {
	install (Vue, options = {}) {
		const directives = { ..._directives }

		Vue.prototype.$motion = {
			options: { ...defaultOptions, ...options },
			progress: 0,
			current: {},
			to: {
				width: 100,
				height: 100,
				x: 0,
				y: 0,
				r: 0,
				progress: 1
			}
		}

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
				if (!this.__motionInjected)
					return next()

				this.$once('motion:hided', e => next())
				this.$emit('motion:hide')
			}
		})
	}
}

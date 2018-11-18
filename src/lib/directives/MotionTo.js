import store from './MotionStore'
import { tween, easing } from 'popmotion'
import css from 'dom-css'

import { setStyles, waitForCreate } from '../utils'

const __inject = async vm => {
	vm.__motionInjected = true
	vm.$emit('motion:show')
}

const full = {
	width: 100,
	height: 100,
	cx: 0,
	cy: 0,
	x: 0,
	y: 0,
	r: 0,
	progress: 1
}

const anim = {
	duration: 375,
	easing: easing.cubicBezier(.4, .0, .2, 1)
}

export const MotionTo = {
	async bind (el, binding, vnode) {
		const _vm = vnode.context //vnode.componentInstance || vnode.context
		const styles = store.get(binding.value)

		if (styles === null || _vm.__motionInjected) return

		const oldOveflow = css.get(el, 'overflow')
		css.set(el, {
			opacity: 0,
			overflow: 'hidden'
		})

		await waitForCreate(_vm)

		_vm.$once('motion:show', () => {
			tween({
				from: {
					...styles,
					toWidth: full.width,
					toHeight: full.height,
				},
				to: {
					...full,
					toWidth: full.width,
					toHeight: full.height,
				},
				...anim
			}).start({
				update: v => {
					setStyles(el, v)
					_vm.$motion = v
					_vm.$forceUpdate()
				},
				complete: e => {
					css.set(el, 'overflow', oldOveflow)
					_vm.$emit('motion:showed')
				}
			})
		})

		_vm.$once('motion:hide', () => {
			const styles = store.get(binding.value)
			if (styles === null) return

			css.set(el, 'overflow', 'hidden')

			tween({
				from: {
					...full,
					toWidth: styles.width,
					toHeight: styles.height,
				},
				to: {
					...styles,
					toWidth: styles.width,
					toHeight: styles.height,
				},
				...anim
			}).start({
				update: v => {
					setStyles(el, v)
					_vm.$motion = v
					_vm.$forceUpdate()
				},
				complete: e => {
					css.set(el, 'overflow', oldOveflow)
					_vm.$emit('motion:hided')
				}
			})
		})

		await __inject(_vm)
	}
}

import store from './MotionStore'
import { tween } from 'popmotion'
import css from 'dom-css'

import {
	setStyles,
	waitForCreate,
	getAnimationOptions,
	getToWH
} from '../utils'

const __inject = async (vm, name) => {
	vm.__motionInjected = true
	vm.$emit('motion:show')
}

export const MotionTo = {
	async bind (el, binding, vnode) {
		const _vm = vnode.context

		_vm.$motion.options.quasar
		&& vnode.componentOptions
		&& vnode.componentOptions.tag == 'q-modal'
		&& [false, undefined].includes(vnode.componentOptions.propsData.noRouteDismiss)
		&& console.warn('QModal without noRouteDismiss work wrong')

		const name = binding.value

		if (_vm.__motionInjected) return

		const oldOveflow = css.get(el, 'overflow')
		css.set(el, {
			opacity: 0,
			overflow: 'hidden'
		})

		await waitForCreate(_vm)

		if (!store.has(name))
			return setStyles(_vm, el, {
				..._vm.$motion.to,
				...getToWH(_vm.$motion.to)
			})

		_vm.$on('motion:show', () => {
			const styles = store.get(name)

			store.open(name)

			tween({
				from: {
					...styles,
					...getToWH(_vm.$motion.to)
				},
				to: {
					..._vm.$motion.to,
					...getToWH(_vm.$motion.to)
				},
				...getAnimationOptions(_vm)
			})
			.start({
				update: v => setStyles(_vm, el, v),
				complete: e => {
					css.set(el, 'overflow', oldOveflow)
					_vm.$emit('motion:showed')
				}
			})
		})

		_vm.$on('motion:hide', () => {
			const styles = store.get(name)
			if (styles === null) return

			css.set(el, 'overflow', 'hidden')

			tween({
				from: {
					..._vm.$motion.to,
					...getToWH(styles)
				},
				to: {
					...styles,
					...getToWH(styles)
				},
				...getAnimationOptions(_vm)
			})
			.start({
				update: v => setStyles(_vm, el, v),
				complete: e => {
					css.set(el, 'overflow', oldOveflow)
					store.close(name)
					_vm.$emit('motion:hided')
				}
			})
		})

		await __inject(_vm, name)
	}
}

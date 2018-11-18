import store from './MotionStore'

export const MotionFrom = {
	bind (el, binding, vnode) {
		const _vm = vnode.context
		const name = binding.value

		el.addEventListener('click', e => store.set(name, el))

		if (binding.modifiers.round)
			store.setRound(name)
	}
}

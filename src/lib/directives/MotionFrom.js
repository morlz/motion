import store from './MotionStore'

export const MotionFrom = {
	bind (el, binding, vnode) {
		el.addEventListener('click', e => store.set(binding.value, el))
		if (binding.modifiers.round)
			store.setRound(binding.value)
	}
}

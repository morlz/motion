export default vm => {
	let { duration, easing } = vm.$motion.options
	return {
		duration,
		easing
	}
}

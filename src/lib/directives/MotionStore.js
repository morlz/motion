
class MotionStore {
	constructor () {
		this.motions = {}
		this.rounds = {}
	}

	get (name) {
		if (!this.motions[name])
			return null

		const rect = this.motions[name].getBoundingClientRect()

		return {
			width: rect.width / window.innerWidth * 100,
			height: rect.height / window.innerHeight * 100,
			x: rect.x,
			y: rect.y,
			cx: -window.innerWidth / 2 + +rect.x + +rect.width / 2,
			cy: -window.innerHeight / 2 + +rect.y + +rect.height / 2,
			r: this.rounds[name] || 0,
			progress: 0
		}
	}

	set (name, node) {
		this.motions[name] = node
	}

	setRound (name, value = 1) {
		this.rounds[name] = value
	}
}

export default new MotionStore()

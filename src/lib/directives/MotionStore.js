
class MotionStore {
	constructor () {
		this.motions = {}
		this.rounds = {}
		this.active = {}
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

	start (name) {
		this.active[name] = true
	}

	stop (name) {
		if (typeof this.active[name] == 'function')
			this.active[name]()

		this.active[name] = false
	}

	isRuning (name) {
		return !!+this.active[name]
	}

	waitForReady (name) {
		return new Promise(resolve => {
			if (this.isRuning(name))
				this.active[name] = resolve
			else
				resolve()
		})
	}
}

export default new MotionStore()

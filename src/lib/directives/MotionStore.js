
class MotionStore {
	constructor () {
		this.motions = {}
		this.rounds = {}
		this.opened = {}
	}

	get (name) {
		if (!this.has(name))
			return null

		const rect = this.motions[name].getBoundingClientRect()

		return {
			width: rect.width / window.innerWidth * 100,
			height: rect.height / window.innerHeight * 100,
			x: rect.x,
			y: rect.y,
			r: this.rounds[name] || 0,
			progress: 0
		}
	}

	set (name, node) {
		this.motions[name] = node
	}

	has (name) {
		return !!this.motions[name]
	}

	setRound (name, value = 1) {
		this.rounds[name] = value
	}

	open (name) {
		if (this.isOpened(name)) return

		this.opened[name] = true
	}

	close (name) {
		if (typeof this.opened[name] == 'function')
			this.opened[name]()

		this.opened[name] = false
	}

	isOpened (name) {
		return !!this.opened[name]
	}

	resolve (name) {
		return new Promise(resolve => {
			if (this.isOpened(name))
				this.opened[name] = resolve
			else
				resolve()
		})
	}
}

export default new MotionStore()


class MotionStore {
	constructor () {
		this.motions = {}
		this.rounds = {}
		this.opened = {}
	}

	get (name) {
		if (!this.has(name))
			return null

		const rect = this.motions[name]

		return {
			width: rect.width / window.innerWidth * 100,
			height: rect.height / window.innerHeight * 100,
			x: rect.x,
			y: rect.y,
			r: this.rounds[name] || 0,
			progress: 0
		}
	}

	set (name, rect) {
		this.motions[name] = rect
	}

	unset (name) {
		this.set(name, undefined)
		this.setRound(name, undefined)
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
		this.opened[name] = false
	}

	isOpened (name) {
		return !!this.opened[name]
	}
}

export default new MotionStore()

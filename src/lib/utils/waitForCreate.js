const __reqF = (f, t = 30) =>
	new Promise(resolve => {
		setTimeout(() => {
			if (f())
				return resolve()

			return __reqF(f, t)
		}, t)
	})

export default vm => new Promise(resolve =>
	__reqF(() => vm._isMounted)
		.then(resolve)
)

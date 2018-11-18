import css from 'dom-css'

const formatters = {
	wrapper: styles => ({
		maxWidth: styles.width + 'vw',
		maxHeight: styles.height + 'vh',
		transform: `translate(${styles.x}px, ${styles.y}px)`,
		transition: 'none',
		opacity: 1
	}),
	content: styles => ({
		borderRadius: styles.r * 100 + '%',
		transition: 'none',
		overflow: styles.progress == 1 ?
			'auto'
		:	'hidden',
		minWidth: 0
	}),
	firstChild: styles => ({
		width: styles.toWidth + 'vw',
		height: styles.toHeight + 'vh',
		transition: 'all .375s ease-in-out'
	}),
	toolbar: styles => ({
		opacity: styles.progress,
		transform: `translateY(${-30 + 30 * styles.progress}%)`
	})
}

const __getObjects = node => ({
	wrapper: node,
	content: node.querySelector('.modal-content'),
	toolbar: node.querySelector('.modal-toolbar')
})

export default (vm, node, styles) => {
	for (var style in styles)
		vm.$motion[style] = styles[style]

	let { wrapper, content, toolbar, firstChild } = __getObjects(node)
	if (wrapper) css(wrapper, formatters.wrapper(styles))
	if (content) css(content, formatters.content(styles))
	if (toolbar) css(toolbar, formatters.toolbar(styles))

	vm.$emit('motion:move', vm.$motion)
	vm.$forceUpdate()
}

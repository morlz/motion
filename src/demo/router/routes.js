

export default [
	{
		path: '/',
		component: () =>import ('#/ListLayout'),
		children: [
			{
				path: '',
				components: {
					list: () => import ('#/List')
				},
			},
			{
				path: ':id',
				components: {
					list: () => import ('#/List'),
					modal: () => import ('#/ItemFull')
				}
			},
		]
	},

]

import ListLayout from '#/ListLayout'
import List from '#/List'
import ItemFull from '#/ItemFull'

export default [
	{
		path: '/',
		component: ListLayout,
		children: [
			{
				path: '',
				components: {
					list: List
				},
			},
			{
				path: ':id',
				components: {
					list: List,
					modal: ItemFull
				}
			},
		]
	},
]

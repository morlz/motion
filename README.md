
# @morlz/motion
## Demo
```
npm run demo
```
See gif:
![](demo.gif)

## Installing
```
npm i @morlz/motion
yarn add @morlz/motion
```

## Usage
index.js file:
```js
import Vue from 'vue'
import Motion from '@morlz/motion'

//options are optional
Vue.use(Motion, {
	quasar: false,
	duration: 375
})
```

Layout.vue
```html
<layout>
	<div>
		<router-view name="list"/>
	</div>

	<router-view name="modal"/>
</layout>
```

List.vue
```html
<list>
	<item
		v-for="item in items"
		v-motion-from="'anynamespace'"/>
</list>
```

Modal.vue
```html
<modal v-motion-to="'anynamespace'">
	<item-full/>
</modal>
```

routes.js
```js
{
	path: '/any-path/',
	component: () => import ('#/Layout'),
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
				modal: () => import ('#/Modal')
			}
		},
	]
}
```

> If you use Quasar-framework then use the noRouteDismiss attribute on QModal
>
## API

### Events
`v-motion-to` Has emit the following events to context vm:
- `motion:show` when show animation start
- `motion:showed` when show animation end
- `motion:hide` when hide animation start
- `motion:hided` when hide animation end
- `motion:move(styles)` when animation is running

### Modifers
`v-motion-from.round` If the starting block is round

### Styles
 - `width` range 0 - 100 **%**
 - `height` range 0 - 100 **%**
 - `x` **px** position at the page by x axis
 - `y` **px** position at the page by y axis
 - `r` range 0 - 1 border radius
 - `progress` range 0 - 1 animation position

### Injected $motion
Object styles `vm.$motion` updates only in the component containing v-motion-to.
- `current` current styles
- `progress` progress from styles
- `to` styles of fullscreen modal


# MIT License

Copyright (c) 2018 morlz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

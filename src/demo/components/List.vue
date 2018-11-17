<template>
<div class="List">
	<item
		v-for="item in $store.state.items"
		:key="item.id"
		:content="item"/>
</div>
</template>

<script>
import Item from '#/Item'

export default {
	name: 'List',
	components: {
		Item
	}
}
</script>

<style lang="stylus">
.List
	min-height 100vh
	padding 10px
	display grid
	align-content start
	grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
	grid-gap 10px
	background #eee
	box-sizing border-box
</style>

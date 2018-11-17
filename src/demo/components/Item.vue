<template>
<div
	class="Item"
	@click="$router.push('/' + content.id)"
	v-motion-from="'item'">
	<div class="Item__title">
		{{ content.name }}
	</div>

	<div class="Item__description">
		{{ content.description }}
	</div>
</div>
</template>

<script>
export default {
	name: 'Item',
	props: {
		content: {
			type: Object,
			required: true
		}
	}
}
</script>

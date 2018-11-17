<template>
	<div
		class="Modal"
		v-motion-to="'item'">
		<div
			v-if="content"
			class="Item ItemFull">

			<div class="Item__title">
				{{ content.name }}
			</div>

			<div class="Item__description">
				{{ content.description }}
			</div>

			<transition name="show">
				<div
					v-if="$motion.progress > .8"
					class="Item__content">
					{{ content.content }}
				</div>
			</transition>

		</div>
	</div>

</template>

<script>
export default {
	name: 'ItemFull',
	computed: {
		content () {
			return this.$store.state.items
				.find(item => item.id == this.$route.params.id)
		}
	}
}
</script>

<style lang="stylus">
.Modal
	position fixed
	width 100vw
	height 100vh
	top 0
	left 0
</style>

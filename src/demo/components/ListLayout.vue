<template>
<div class="ListLayout">
	<div class="ListLayout__inner">
		<router-view name="list" key="list"/>
	</div>
	<router-view name="modal" key="modal"/>
</div>
</template>

<script>
export default {
	name: 'ListLayout'
}
</script>

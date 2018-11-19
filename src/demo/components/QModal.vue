<template>
<div class="QModal">
	{{ noRouteDismiss }}
	<slot/>
</div>
</template>

<script>
export default {
	name: 'QModal',
	props: {
		noRouteDismiss: Boolean
	}
}
</script>

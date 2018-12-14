<style lang="less">
	@import './image-displayer.less';
</style>

<template>
	<section id="image-displayer">
		<img class="image-displayer-image" :src="src" />
	</section>
</template>

<script>

export default {
	name: 'image-displayer',
	props: {
		src: String,
	},
	data() {
		return {
		}
	},
	watch: {
	},
	computed: {
	},
	methods: {
	},
	mounted() {
	},
}
</script>

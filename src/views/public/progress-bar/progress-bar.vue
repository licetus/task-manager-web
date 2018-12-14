<style lang="less">
	@import './progress-bar.less';
</style>

<template>
	<div class="progress" :style="style">
		<div class="progress-bar progress-bar-striped progress-bar-animated" :style="progressStyle"></div>
	</div>
</template>

<script>

export default {
	name: 'progress-bar',
	props: {
		width: Number,
		height: Number,
		progress: {
			type: Number,
			min: 0,
			max: 100,
		},
	},
	data() {
		return {
		}
	},
	watch: {
	},
	computed: {
		style() {
			return `width: ${this.width}px; height: ${this.height}px;`
		},
		progressStyle() {
			return `width: ${this.progress}%;`
		},
	},
	methods: {
	},
	mounted() {
	},
}
</script>

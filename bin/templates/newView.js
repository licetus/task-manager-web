export default class ViewTemplate {
	constructor(fileName) {
		this.buffer =
`<style>
	@import './${fileName}.less';
</style>

<template>
	<p>This is ${fileName} page.</p>
</template>

<script>

export default {
	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
		initPage() {
		},
	},
	mounted() {
		this.initPage()
	},
}
</script>
`
	}
}

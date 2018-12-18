export class ViewTemplate {
	constructor(fileName, type) {
		this.buffer =
`<style>
	@import './${fileName}.less';
</style>

<template>
	<p>This is ${fileName} view.</p>
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
		${type === 'public' ? '' : 'initPage() {\n\t\t},'}
	},
	mounted() {
		${type === 'public' ? '' : 'this.initPage()'}
	},
}
</script>
`
	}
}

export class PublicIndex {
	
}

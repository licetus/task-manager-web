import upperCamelCase from 'uppercamelcase'

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
${type === 'public' ? `\tname: '${fileName}',\n\tprops: {\n\t},\n` : ''}	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
${type === 'public' ? '' : '\t\tinitPage() {\n\t\t},\n'}\t},
	mounted() {
${type === 'public' ? '' : '\t\tthis.initPage()\n'}\t},
}
</script>
`
	}
}

export class PublicComponent {
	constructor(fileName) {
		const upperName = upperCamelCase(fileName)
		this.componentBuffer =
`import ${upperName} from './${fileName}.vue'

export default ${upperName}
`
		this.importString = `$1\nimport ${upperName} from './${fileName}'\n$2`
		this.registerString = `$1\n\t\tVue.component('${upperName}', ${upperName})\n$2`
		this.regexpOfImport = /(')\n(\nconst Public = {)/
		this.regexpOfRegister = /(\))\n(\t},\n}\n\nexport default Public)/
	}
}

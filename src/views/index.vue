<style lang="less">
	@import './index.less';
</style>

<template>
	<div>
		<navigator></navigator>
		<router-view></router-view>
		<pageFooter></pageFooter>
	</div>
</template>

<script>
import navigator from './navigator/navigator.vue'
import pageFooter from './footer/footer.vue'

export default {
	components: {
		navigator,
		pageFooter,
	},
	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
	},
	mounted() {
	},
}
</script>

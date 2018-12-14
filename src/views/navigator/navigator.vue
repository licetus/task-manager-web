<style lang="less">
	@import './navigator.less';
</style>

<template>
	<Menu mode="horizontal" theme="dark" @on-select="onSelectMenuItem">
		<Row type="flex" justify="space-between">
			<Col :xs="0" :sm="12" :md="12" :lg="12"><Row type="flex" justify="start" align="middle">
				<MenuItem name="0"><span style="font-size:20px;font-weight:bold;line-height:32px;"><Icon type="md-menu" size="32"/> Bip Webapp Demo</span></MenuItem>
			</Row></Col>
			<Col :xs="8" :sm="0" :md="0" :lg="0"><Row type="flex" justify="start" align="middle">
				<MenuItem name="0"><span style="font-size:20px;font-weight:bold;line-height:32px;"><Icon type="md-menu" size="32"/> Bip</span></MenuItem>
			</Row></Col>
			<Col :xs="0" :sm="12" :md="12" :lg="12"><Row type="flex" justify="end" style="padding: 0 10px;">
				<Col><MenuItem :name="1"><Icon type="md-document" /> Introduction</MenuItem></Col>
				<Col><MenuItem :name="2"><Icon type="md-help-circle" /> Help</MenuItem></Col>
				<Col v-if="userName === ''"><MenuItem :name="3"><Icon type="md-log-in" /> Sign in</MenuItem></Col>
				<Col v-else><MenuItem :name="4"><Icon type="md-log-out" />{{userName}}</MenuItem></Col>
			</Row></Col>
			<Col :xs="16" :sm="0" :md="0" :lg="0"><Row type="flex" justify="end">
				<Col v-if="userName === ''"><MenuItem :name="3"><Icon type="md-log-in" size="32" style="margin-right:0;"/></MenuItem></Col>
				<Col v-else><MenuItem :name="4"><span style="font-size:20px;font-weight:bold;line-height:32px;">{{userName}} </span><Icon type="md-log-out" size="24" style="margin-right:0;margin-bottom:4px;"/></MenuItem></Col>
			</Row></Col>
		</Row>
	</Menu>
</template>

<script>
import Api from '../../facades/api'

export default {
	data() {
		return {
			userName: '',
		}
	},
	computed: {
	},
	methods: {
		onSelectMenuItem(name) {
			switch (name) {
				case 3:
					this.login()
					break
				case 4:
					this.logout()
					break
				default: break
			}
		},
		login() {
			Api.login.authorize()
		},
		logout() {
			this.$Modal.confirm({
				title: 'Log Out',
				content: 'Are you sure to log out Bip ?',
				onOk: () => {
					sessionStorage.clear('UserName')
					this.userName = ''
				},
			})
		},
		initPage() {
			this.userName = sessionStorage.getItem('UserName') || ''
		},
	},
	mounted() {
		this.initPage()
	},
}
</script>

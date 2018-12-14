<style>
</style>

<template>
	<p>Log in successfully, now redirecting...</p>
</template>

<script>
import { Base64 } from 'js-base64'
// import Api from '../libs/api'

export default {
	data() {
		return {
		}
	},
	methods: {
		decodeRoute() {
			const idToken = this.$route.hash.match(/id_token=(\S+)\.(\S+)\.(\S+)&/)
			const user = JSON.parse(Base64.decode(idToken[2]))
			sessionStorage.setItem('UserName', user.name)
			this.$router.push('/')
		},
	},
	mounted() {
		this.decodeRoute()
		// this.getToken()
	},
}
</script>

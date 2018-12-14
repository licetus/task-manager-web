import axios from 'axios'
import Config from '../../build/config'
import errorParser from './error-parser'
import Store from '../store/store'


const createInstance = (authenticated, isUpload) => {
	const baseURL = Store.apiHost()
	const timeout = isUpload ? Config.uploadInterval : Config.httpRequestInterval
	let headers = {}
	if (authenticated) {
		const token = sessionStorage.getItem('token')
		headers = { 'X-Auth-Key': token }
	}
	const instance = axios.create({
		baseURL,
		timeout,
		headers,
		validateStatus: () => true,
	})
	instance.interceptors.response.use(errorParser)
	return instance
}

const createAuthInstance = () => createInstance(true)
const createUploadInstance = () => createInstance(true, true)

export {
	createAuthInstance,
	createUploadInstance,
}

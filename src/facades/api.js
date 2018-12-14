import axios from 'axios'
import Config from '../../build/config'
import Utils from '../utils'
import Store from '../store/store'
import { createAuthInstance, createUploadInstance } from './base'

const api = {}

const { CancelToken } = axios
let source

api.cancelRequest = {
	upload: message =>
		source.cancel(message),
}

api.login = {
	authorize: () => {

		const query = {
			client_id: Config.oauth.aad.clientId,
			response_type: Config.oauth.aad.responseType,
			redirect_uri: Store.redirectUri(),
			scope: Config.oauth.aad.scope,
			response_mode: Config.oauth.aad.responseMode,
			nonce: Config.oauth.aad.nonce,
		}
		const str = `?${Utils.generateQueryString(query)}`
		const loginAddress = `${Config.oauth.aad.host}/authorize${str}`
		window.location.href = loginAddress
	},
}


api.file = {
	upload: async (file, onProgress, onCancel) => {
		source = CancelToken.source()
		const data = new window.FormData()
		data.append('file', file)
		const uploadConfig = {
			cancelToken: source.token,
			onUploadProgress: (progressEvent) => {
				const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
				onProgress(percentCompleted)
			},
		}
		return createUploadInstance().post('media/file', data, uploadConfig).then(res => res.data).catch((thrown) => {
			if (axios.isCancel(thrown)) {
				onCancel(thrown.message)
			}
		})
	},
	add: async params =>
		createAuthInstance().post('document', params).then(res => res.data),
	delete: async id =>
		createAuthInstance().delete(`document/${id}`).then(res => res.data),
	update: async (params, id) =>
		createAuthInstance().patch(`document/${id}`, params).then(res => res.data),
	fetch: async id =>
		createAuthInstance().get(`document/${id}`).then(res => res.data),
	fetchList: async (pagesize, page, filters, orderBy) => {
		const query = {
			pagesize,
			page,
			filters,
			orderBy,
		}
		const str = `?${Utils.generateQueryString(query)}`
		return createAuthInstance().get(`document${str}`).then(res => res.data)
	},
	fetchRecentList: async () =>
		createAuthInstance().get('document/history').then(res => res.data),
}

api.tag = {
	fetchList: async () =>
		createAuthInstance().get('document/tag').then(res => res.data),
}


export default api

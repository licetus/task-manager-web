import moment from 'moment'
import Config from '../../build/config'

const utils = {
}

utils.title = (title) => {
	title = title ? `${title} - Home` : 'iView project'
	window.document.title = title
}

utils.errorHandler = () => {
}

utils.formatFileSize = (fileByte) => {
	if (!fileByte && fileByte !== 0) return '-'
	const fileSizeByte = fileByte
	let fileSizeMsg = ''
	if (fileSizeByte < Config.fileSize.mb) fileSizeMsg = `${(fileSizeByte / Config.fileSize.kb).toFixed(2)}KB`
	else if (fileSizeByte === Config.fileSize.mb) fileSizeMsg = '1MB'
	else if (fileSizeByte > Config.fileSize.mb && fileSizeByte < Config.fileSize.gb) fileSizeMsg = `${(fileSizeByte / (Config.fileSize.kb * Config.fileSize.kb)).toFixed(2)}MB`
	else if (fileSizeByte > Config.fileSize.mb && fileSizeByte === Config.fileSize.gb) fileSizeMsg = '1GB'
	else if (fileSizeByte > Config.fileSize.gb && fileSizeByte < Config.fileSize.tb) fileSizeMsg = `${(fileSizeByte / (Config.fileSize.kb * Config.fileSize.kb * Config.fileSize.kb)).toFixed(2)}GB`
	else fileSizeMsg = 'file size over 1 TB'
	return fileSizeMsg
}

utils.formatTime = (timestamp) => {
	if (!timestamp) {
		return '-'
	}
	return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

utils.formatDate = (timestamp) => {
	if (!timestamp) {
		return '-'
	}
	return moment(timestamp).format('YYYY-MM-DD')
}

utils.generateQueryString = (params) => {
	const urlEncode = (param, key, encode) => {
		if (!param) return ''
		let paramStr = ''
		const t = typeof (param)
		if (t === 'string' || t === 'number' || t === 'boolean') {
			paramStr += `&${key}=${((encode == null || encode) ? encodeURIComponent(param) : param)}`
		} else {
			Object.keys(param).forEach((i) => {
				const k = key == null ? i : key + (param instanceof Array ? `[${i}]` : `.${i}`)
				paramStr += urlEncode(param[i], k, encode)
			})
		}
		return paramStr
	}
	return urlEncode(params).slice(1)
}

export default utils

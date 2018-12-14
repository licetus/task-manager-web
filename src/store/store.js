import Api from '../facades/api'
import Enum from '../models/enum'
import Utils from '../utils'
import Config from '../../build/config'

const store = {}

store.host = () => {
	switch (Config.env) {
		case 'development':
			return Config.localHost
		case 'production':
			return Config.serverHost
		default: return Config.localHost
	}
}

store.apiHost = () => {
	switch (Config.env) {
		case 'development':
			return Config.localApiHost
		case 'production':
			return Config.serverApiHost
		default: return Config.localApiHost
	}
}

store.redirectUri = () => {
	switch (Config.env) {
		case 'development':
			return Config.oauth.aad.localRedirectUri
		case 'production':
			return Config.oauth.aad.serverRedirectUri
		default: return Config.oauth.aad.localRedirectUri
	}
}

store.fileType = (fileType) => {
	if (!fileType) {
		return null
	}
	switch (fileType) {
		case Enum.FileType.Unknown:
			return 'Unknown'
		case Enum.FileType.Image:
			return 'Image'
		case Enum.FileType.Pdf:
			return 'Pdf'
		case Enum.FileType.Audio:
			return 'Audio'
		default: {
			return 'Unknown'
		}
	}
}

store.fileTypeClass = (fileType) => {
	if (!fileType) {
		return '-'
	}
	switch (fileType) {
		case Enum.FileType.Unknown:
			return 'unknown'
		case Enum.FileType.Image:
			return 'image'
		case Enum.FileType.Pdf:
			return 'pdf'
		case Enum.FileType.Audio:
			return 'audio'
		default: {
			return 'unknown'
		}
	}
}

store.fileCategory = (fileCategory) => {
	if (!fileCategory && fileCategory !== 0) {
		return '-'
	}
	switch (fileCategory) {
		case Enum.FileCategory.Unknow:
			return 'Unknow'
		case Enum.FileCategory.Tech:
			return 'Tech'
		case Enum.FileCategory.Design:
			return 'Design'
		case Enum.FileCategory.Prototype:
			return 'Prototype'
		case Enum.FileCategory.Document:
			return 'Document'
		default: {
			return 'Unknown'
		}
	}
}

store.fileCategoryColor = (fileCategory) => {
	if (!fileCategory && fileCategory !== 0) {
		return null
	}
	switch (fileCategory) {
		case Enum.FileCategory.Unknow:
			return 'black'
		case Enum.FileCategory.Tech:
			return 'blue'
		case Enum.FileCategory.Design:
			return 'red'
		case Enum.FileCategory.Prototype:
			return 'green'
		case Enum.FileCategory.Document:
			return 'orange'
		default: {
			return null
		}
	}
}

store.fetchTagList = async () => {
	try {
		const res = await Api.tag.fetchList()
		sessionStorage.setItem('tagList', JSON.stringify(res.items.reverse()))
	} catch (e) {
		Utils.errorHandler(e)
	}
}

store.fileTag = (fileTag) => {
	if (!fileTag && fileTag !== 0) {
		return null
	}
	if (!sessionStorage.getItem('tagList')) this.fetchTagList()
	const tagList = JSON.parse(sessionStorage.getItem('tagList'))
	for (const item of tagList) {
		if (item.id === fileTag) {
			return item.name
		}
	}
	return 'Unknown'
}

export default store

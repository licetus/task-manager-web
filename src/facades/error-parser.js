class ServerError extends Error {
	constructor(code, message) {
		super(message)
		this.code = code
	}
}

const errorParser = (response) => {
	if (response.status === 200 || response.status === 204) {
		return response
	} else if (response.data && response.data.error) {
		const error = new ServerError(response.data.error.code, response.data.error.message)
		return Promise.reject(error)
	}
	return Promise.reject(new Error('unknown network error'))
}
export default errorParser

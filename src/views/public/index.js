import InfoCard from './info-card'
import FileUploader from './file-uploader'
import AudioPlayer from './audio-player'
import PDFReader from './pdf-reader'
import ImageDisplayer from './image-displayer'
import ProgressBar from './progress-bar'


const Public = {
	install(Vue) {
		Vue.component('InfoCard', InfoCard)
		Vue.component('FileUploader', FileUploader)
		Vue.component('AudioPlayer', AudioPlayer)
		Vue.component('PDFReader', PDFReader)
		Vue.component('ImageDisplayer', ImageDisplayer)
		Vue.component('ProgressBar', ProgressBar)
	},
}

export default Public

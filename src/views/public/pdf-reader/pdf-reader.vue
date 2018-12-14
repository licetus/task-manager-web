<style>
@import './pdf-reader.less';
</style>

<template>
	<div id="pdf-reader" :padding="0">
		<!-- <Row type="flex" justify="center" align="middle">
			<Col :span="6"><Slider v-model="size" :min="50" :max="200" :step="10" @on-change="pageScale" show-tip="never"></Slider></Col>
			<Col :span="2" :offset="1"><span>{{size}} %</span></Col>
		</Row> -->
		<Row class-name="page-head" type="flex" justify="space-between">
			<Col><a href="javascript:void(0)" @click.prevent="onPrevPage">prev</a></Col>
			<Col><span>{{pageNum}} / {{pageTotal}}</span></Col>
			<Col><a href="javascript:void(0)" @click.prevent="onNextPage">next</a></Col>

		</Row>
		<Row class-name="page-body" type="flex" justify="center">
			<Col :span="24"><canvas id="pdf-reader-canvas"></canvas></Col>
		</Row>
		<Row class-name="page-foot" type="flex" justify="center" align="middle" :gutter="20">
			<Col><a href="javascript:void(0)" @click.prevent="onPrevPage">{{'<'}}</a></Col>
			<Col><span>{{pageNum}} / {{pageTotal}}</span></Col>
			<Col><a href="javascript:void(0)" @click.prevent="onNextPage">{{'>'}}</a></Col>
		</Row>
	</div>
</template>

<script>
import PDFJS from 'pdfjs-dist'

export default {
	name: 'pdf-reader',
	props: {
		src: String,
	},
	data() {
		return {
			pdfDoc: null,
			pageNum: 1,
			pageTotal: null,
			pageRendering: false,
			pageNumPending: null,
			scale: 2,
			size: 100,
		}
	},
	watch: {
		src() {
			this.showPDF(this.src)
		},
	},
	computed: {
	},
	methods: {
		showPDF(url) {
			const _this = this
			PDFJS.GlobalWorkerOptions.workerSrc = '../../../../node_modules/pdfjs-dist/build/pdf.worker.js'
			PDFJS.getDocument(url).then((pdf) => {
				_this.pdfDoc = pdf
				_this.pageTotal = pdf.numPages
				_this.renderPage(1)
			})
		},
		pageScale() {
			if (!this.pageRendering) {
				this.renderPage(this.pageNum)
			}
		},
		renderPage(num) {
			this.pageRendering = true
			const _this = this
			this.pdfDoc.getPage(num).then((page) => {
				const viewport = page.getViewport(_this.scale)
				const canvas = document.getElementById('pdf-reader-canvas')
				canvas.height = viewport.height
				canvas.width = viewport.width
				// Render PDF page into canvas context
				const renderContext = {
					canvasContext: canvas.getContext('2d'),
					viewport,
				}
				const renderTask = page.render(renderContext)

				// Wait for rendering to finish
				renderTask.promise.then(() => {
					_this.pageRendering = false
					if (_this.pageNumPending !== null) {
						// New page rendering is pending
						this.renderPage(_this.pageNumPending)
						_this.pageNumPending = null
					}
				})
			})
		},
		queueRenderPage(num) {
			if (this.pageRendering) {
				this.pageNumPending = num
			} else {
				this.renderPage(num)
			}
		},
		onPrevPage() {
			if (this.pageNum <= 1) {
				return
			}
			this.pageNum -= 1
			this.queueRenderPage(this.pageNum)
		},
		onNextPage() {
			if (this.pageNum >= this.pdfDoc.numPages) {
				return
			}
			this.pageNum += 1
			this.queueRenderPage(this.pageNum)
		},
	},
	mounted() {
		this.showPDF(this.src)
	},
}
</script>

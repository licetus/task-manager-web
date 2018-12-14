<style lang="less">
	@import './audio-player.less';
</style>

<template>
	<section type="flex" id="audio-player">
		<Row id="audio-player-content">
			<Col :xs="0" :sm="24" :md="24" :lg="24"><canvas id="audio-player-canvas"></canvas></Col>
			<Col :xs="24" :sm="0" :md="0" :lg="0"><Row id="audio-player-icon" type="flex" justify="center" align="middle"><Icon type="md-volume-up" size="64" color="white"/></Row></Col>
			<Col><audio id="audio-player-player" :src="src" controls></audio></Col>
		</Row>
		<div v-if="console" id="audio-player-console">
			<Row type="flex" justify="space-between">
				<Col><span>R: {{r}}</span></Col>
				<Col><span>G: {{g}}</span></Col>
				<Col><span>B: {{b}}</span></Col>
			</Row>
			<Row type="flex" justify="space-between">
				<Col :span="5"><Slider v-model="rx" :min="0" :max="255" :step="1"></Slider><span>{{rx}}</span></Col>
				<Col :span="5"><Slider v-model="gx" :min="0" :max="255" :step="1"></Slider><span>{{gx}}</span></Col>
				<Col :span="5"><Slider v-model="bx" :min="0" :max="255" :step="1"></Slider><span>{{bx}}</span></Col>
			</Row>
			<Row type="flex" justify="space-between">
				<Col :span="10"><Slider v-model="barWidthx" :min="1" :max="10" :step="1"></Slider><span>BarWidth: {{barWidthx}}</span></Col>
				<Col :span="10"><Slider v-model="ix" :min="1" :max="100" :step="1"></Slider><span>Ix: {{ix}}</span></Col>
			</Row>
		</div>
	</section>
</template>

<script>

export default {
	name: 'audio-player',
	props: {
		src: String,
		console: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			r: 0,
			rx: 180,
			g: 0,
			gx: 150,
			b: 0,
			bx: 135,
			ix: 6,
			barWidthx: 3,
		}
	},
	watch: {
		src() {
			this.audioPlay()
		},
	},
	computed: {
	},
	methods: {
		audioPlay() {
			const that = this
			const audio = document.getElementById('audio-player-player')
			audio.crossOrigin = 'anonymous'
			const context = new AudioContext()
			const src = context.createMediaElementSource(audio)
			const analyser = context.createAnalyser()

			const canvas = document.getElementById('audio-player-canvas')
			const ctx = canvas.getContext('2d')
			src.connect(analyser)
			analyser.connect(context.destination)
			analyser.fftSize = 256
			const bufferLength = analyser.frequencyBinCount
			const dataArray = new Uint8Array(bufferLength)
			const WIDTH = canvas.width
			const HEIGHT = canvas.height

			const barWidth = (WIDTH / bufferLength) * this.barWidthx
			let barHeight
			let x = 0

			function renderFrame() {
				requestAnimationFrame(renderFrame)
				x = 0
				analyser.getByteFrequencyData(dataArray)

				ctx.fillStyle = '#000'
				ctx.fillRect(0, 0, WIDTH, HEIGHT)
				for (let i = 0; i < bufferLength; i += 1) {
					barHeight = dataArray[i] / 2
					that.r = barHeight + (that.rx * (i / bufferLength))
					that.g = that.gx * ((i * that.ix) / bufferLength)
					that.b = that.bx

					ctx.fillStyle = `rgb(${that.r}, ${that.g}, ${that.b})`
					ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)
					x += barWidth + 1
				}
			}
			renderFrame()
		},
	},
	mounted() {
		this.audioPlay()
	},
}
</script>

<style lang="less">
	@import './info-card.less';
</style>

<template>
	<section class="info-card">
		<div class="info-card-lg">
			<!-- lg card -->
			<div v-if="size === 0" class="info-card-lg-card">
				<div class="info-card-lg-card-img-div">
					<a href="javascript:void(0);" @click.prevent="onClickCard"><img class="info-card-lg-card-img" :src="fileRectangleThumbUrlFormat" alt="image error"/></a>
				</div>
				<div class="info-card-lg-card-text">
					<div class="info-card-lg-card-title-div">
						<Row type="flex" justify="start" align="middle">
							<Col><a href="javascript:void(0);" @click.prevent="onClickIcon"><font-awesome-icon class="info-card-lg-icon" :icon="fileIconClass" size="lg" /></a></Col>
							<Col><a href="javascript:void(0);" @click.prevent="onClickFilename"><span class="info-card-lg-card-filename">{{params.filename}}</span></a></Col>
							<Col><a href="javascript:void(0);" @click.prevent="onClickCategory"><font-awesome-icon :class="fileCategoryClass" icon="circle"/></a></Col>
						</Row>
					</div>
					<div v-if="params.fileTags && params.fileTags.length > 0" class="info-card-lg-card-tags-div">
						<Row type="flex" justify="start" :gutter="5">
							<template v-for="(item, index) of params.fileTags">
								<Col><Tag type="border"><a href="javascript:void(0)" @click.stop.prevent="onClickTag(item)">{{fileTagsFormat[index]}}</a></Tag></Col>
							</template>
						</Row>
					</div>
					<div v-if="params.fileTags && params.fileTags.length > 0" class="info-card-lg-card-content-div-2">
						<p class="info-card-lg-card-content-2">{{params.fileContent}}</p>
					</div>
					<div v-else class="info-card-lg-card-content-div-3">
						<p class="info-card-lg-card-content-3">{{params.fileContent}}</p>
					</div>
					<div class="info-card-lg-card-property-div">
						<Row type="flex" justify="space-between">
							<Col>
								<span class="info-card-lg-card-property">{{fileSizeFormat}}</span>
							</Col>
							<Col>
								<span class="info-card-lg-card-property">{{fileUploadTimeFormat}}</span>
							</Col>
						</Row>
					</div>
				</div>
			</div>
			<!-- lg list -->
			<div v-else-if="size === 2" class="info-card-lg-list">
				<Row type="flex" justify="start">
					<Col class="info-card-lg-list-img-div">
						<a href="javascript:void(0);" @click.prevent="onClickCard"><img class="info-card-lg-list-img" :src="fileSquareThumbUrlFormat" alt="image error"/></a>
					</Col>
					<Col class="info-card-lg-list-text">
						<Row type="flex" justify="start">
							<Col class-name="info-card-lg-list-title-div">
								<Row type="flex" justify="space-between">
									<Col class-name="info-card-lg-list-name-div" :xs="24" :sm="12" :md="12" :lg="12"><Row type="flex" justify="start" align="middle">
										<Col><a href="javascript:void(0);" @click.prevent="onClickIcon"><font-awesome-icon class="info-card-lg-icon" :icon="fileIconClass" size="lg" /></a></Col>
										<Col><a href="javascript:void(0);" @click.prevent="onClickFilename"><span class="info-card-lg-list-filename">{{params.filename}}</span></a></Col>
										<Col><a href="javascript:void(0);" @click.prevent="onClickCategory"><font-awesome-icon :class="fileCategoryClass" icon="circle"/></a></Col>
									</Row></Col>
									<!-- TODO: limit tag text length -->
									<Col class-name="info-card-lg-list-tags-div" :xs="24" :sm="0" :md="0" :lg="0"><Row type="flex" justify="start" align="middle" :gutter="5">
										<template v-for="(item, index) of params.fileTags">
											<Col><Tag type="border"><a href="javascript:void(0)" @click.stop.prevent="onClickTag(item)">{{fileTagsFormat[index]}}</a></Tag></Col>
										</template></Row>
									</Col>
									<Col class-name="info-card-lg-list-tags-div" :xs="0" :sm="12" :md="12" :lg="8"><Row type="flex" justify="end" align="middle" :gutter="5">
										<template v-for="(item, index) of params.fileTags">
											<Col><Tag type="border"><a href="javascript:void(0)" @click.stop.prevent="onClickTag(item)">{{fileTagsFormat[index]}}</a></Tag></Col>
										</template></Row>
									</Col>
								</Row>
							</Col>
							<Col class-name="info-card-lg-list-content-div" :xs="0" :sm="24" :md="24" :lg="24">
								<p class="info-card-lg-list-content">{{params.fileContent}}</p>
							</Col>
							<Col class-name="info-card-lg-list-content-div" :xs="24" :sm="0" :md="0" :lg="0" v-if="!hasTag">
								<p class="info-card-lg-list-content">{{params.fileContent}}</p>
							</Col>
						</Row>
						<div class="info-card-lg-list-property-div">
							<Row type="flex" justify="space-between">
								<Col>
									<span class="info-card-lg-list-property">{{fileSizeFormat}}</span>
								</Col>
								<Col>
									<span class="info-card-lg-list-property">{{fileUploadTimeFormat}}</span>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</div>
		</div>

		<div class="info-card-sm">
			<!-- sm card -->
			<div v-if="size === 1" class="info-card-sm-card">
				<div class="info-card-sm-card-img-div">
					<a href="javascript:void(0);" @click.prevent="onClickCard"><img class="info-card-sm-card-img" :src="fileSquareThumbUrlFormat" alt="image error"/></a>
				</div>
				<div class="info-card-sm-card-text">
					<div class="info-card-sm-card-title-div">
						<Row type="flex" justify="start" align="middle">
							<Col><a href="javascript:void(0);" @click.prevent="onClickIcon"><font-awesome-icon class="info-card-sm-icon" :icon="fileIconClass" size="sm" /></a></Col>
							<Col><a href="javascript:void(0);" @click.prevent="onClickFilename"><span class="info-card-sm-filename">{{params.filename}}</span></a></Col>
						</Row>
					</div>
					<Poptip>
					</Poptip>
				</div>
			</div>
			<!-- sm list -->
			<div v-else-if="size === 3" class="info-card-lg-list">
				<Row type="flex" justify="start">
					<Col class="info-card-lg-list-img-div">
						<a href="javascript:void(0);" @click.prevent="onClickCard"><img class="info-card-lg-list-img" :src="fileSquareThumbUrlFormat" alt="image error"/></a>
					</Col>
					<Col class="info-card-lg-list-text">
						<div class="info-card-lg-list-title-div">
							<Row type="flex" justify="space-between">
								<Col>
									<Row type="flex" justify="start" align="middle">
										<Col><a href="javascript:void(0);" @click.prevent="onClickIcon"><font-awesome-icon class="info-card-lg-icon" :icon="fileIconClass" size="lg" /></a></Col>
										<Col><a href="javascript:void(0);" @click.prevent="onClickFilename"><span class="info-card-lg-filename">{{params.filename}}</span></a></Col>
										<Col><a href="javascript:void(0);" @click.prevent="onClickCategory"><font-awesome-icon :class="fileCategoryClass" icon="circle"/></a></Col>
									</Row>
								</Col>
								<Col>
									<div class="info-card-lg-list-tags-div">
										<Row type="flex" justify="end" :gutter="5">
											<template v-for="(item, index) of params.fileTags">
												<Col><Tag type="border"><a href="javascript:void(0)" @click.stop.prevent="onClickTag(item)">{{fileTagsFormat[index]}}</a></Tag></Col>
											</template>
										</Row>
									</div>
								</Col>
							</Row>
						</div>
						<div class="info-card-lg-list-content-div">
							<p class="info-card-lg-list-content">{{params.fileContent}}</p>
						</div>
						<div class="info-card-lg-list-property-div">
							<Row type="flex" justify="space-between">
								<Col>
									<span class="info-card-lg-list-property">{{fileSizeFormat}}</span>
								</Col>
								<Col>
									<span class="info-card-lg-list-property">{{fileUploadTimeFormat}}</span>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	</section>
</template>

<script>
import AudioRectangledCover from '../../../assets/imgs/audio-rectangle-cover.jpg'
import AudioSquareCover from '../../../assets/imgs/audio-square-cover.jpg'
import PDFRectangledCover from '../../../assets/imgs/pdf-rectangle-cover.jpg'
import PDFSquareCover from '../../../assets/imgs/pdf-square-cover.jpg'
import UnknownRectangledCover from '../../../assets/imgs/unknown-rectangle-cover.jpg'
import UnknownSquareCover from '../../../assets/imgs/unknown-square-cover.jpg'

import Enum from '../../../models/enum'
import Utils from '../../../utils'
import Store from '../../../store/store'

export default {
	name: 'info-card',
	props: {
		params: {
			id: Number,
			thumbUrl: String,
			fileType: {
				type: Number,
				default: 0,
			},
			filename: String,
			fileCategory: Number,
			fileTags: Array,
			fileContent: String,
			fileSize: Number,
			fileUploadTime: Number,
		},
		size: {
			type: Number,
			default: 0,
		},
		disabled: Boolean,
	},
	data() {
		return {
		}
	},
	computed: {
		hasTag() {
			return this.params.fileTags && this.params.fileTags.length > 0
		},
		fileIconClass() {
			return `file-${Store.fileTypeClass(this.params.fileType)}`
		},
		fileRectangleThumbUrlFormat() {
			switch (this.params.fileType) {
				case Enum.FileType.Unknown:
					return UnknownRectangledCover
				case Enum.FileType.Image:
					return `${Store.host()}${this.params.thumbUrl}`
				case Enum.FileType.Pdf:
					return PDFRectangledCover
				case Enum.FileType.Audio:
					return AudioRectangledCover
				default: return UnknownRectangledCover
			}
		},
		fileSquareThumbUrlFormat() {
			switch (this.params.fileType) {
				case Enum.FileType.Unknown:
					return UnknownSquareCover
				case Enum.FileType.Image:
					return `${Store.host()}${this.params.thumbUrl}`
				case Enum.FileType.Pdf:
					return PDFSquareCover
				case Enum.FileType.Audio:
					return AudioSquareCover
				default: return UnknownSquareCover
			}
		},
		fileCategoryClass() {
			return `file-category-${Store.fileCategoryColor(this.params.fileCategory)}`
		},
		fileTagsFormat() {
			const arr = []
			if (this.params.fileTags && this.params.fileTags.length > 0) {
				this.params.fileTags.forEach((item) => {
					let i = 0
					if (typeof item === 'string') i = parseInt(item, 10)
					else if (typeof item === 'number') i = item
					arr.push(Store.fileTag(i))
				})
			}
			return arr
		},
		fileSizeFormat() {
			return Utils.formatFileSize(this.params.fileSize)
		},
		fileUploadTimeFormat() {
			return Utils.formatDate(this.params.fileUploadTime)
		},
	},
	methods: {
		onClickCard() {
			if (!this.disabled) {
				this.$router.push(`/file/${this.params.id}`)
			}
		},
		onClickIcon() {
			if (!this.disabled) {
				this.$emit('on-click-icon', this.params.fileType)
			}
		},
		onClickFilename() {
			if (!this.disabled) {
				this.$router.push(`/file/${this.params.id}`)
			}
		},
		onClickCategory() {
			if (!this.disabled) {
				this.$emit('on-click-category', this.params.fileCategory)
			}
		},
		onClickTag(item) {
			if (!this.disabled) {
				const arr = [item]
				this.$emit('on-click-tag', arr)
			}
		},
	},
	mounted() {
	},
}
</script>

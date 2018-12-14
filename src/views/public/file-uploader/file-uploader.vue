<style lang="less">
	@import './file-uploader.less';
</style>

<template>
	<section class="file-uploader">
		<Button type="primary" @click="onClickUpload" size="large" :disabled="disabled" :loading="isSubmitting || isUploading"><Icon type="md-cloud-upload" size="20"/> {{buttonText}}</Button>
		<Modal v-model="isUploadModalVisible" width="80" :styles="modalStyle" :transfer="transfer" :mask-closable="false" :closable="false" footer-hide>
			<Row type="flex" justify="center">
				<Col :xs="24" :sm="24" :md="22" :lg="22">
					<Row class-name="file-uploader-top-margin" type="flex" justify="center">
						<Col :xs="0" :sm="0" :md="24" :lg="24"></Col>
					</Row>
					<Row class-name="file-uploader-top-area" type="flex" justify="center">
						<Col :span="24"  v-if="!isUploading && !isFileSelected && !isUploaded">
							<Upload
								action="" :before-upload="onClickSelect"
								accept="image/*, audio/*, *.wav, application/pdf"
								:format="['jpg', 'jpeg', 'png', 'mp3', 'wav', 'pdf']"
								type="drag">
								<Row type="flex" align="middle" justify="center" class-name="file-uploader-top-area-upload">
									<Col :span="24">
											<Icon class="file-uploader-top-area-upload-icon" type="ios-cloud-upload" size="52" style="color: #007bff"></Icon>
											<p>Click or drag files here to upload</p>
									</Col>
								</Row>
							</Upload>
						</Col>
						<Col :span="24" class="file-uploader-top-area-progress" v-if="isUploading">
							<ProgressBar :progress="progress" :height="30"></ProgressBar>
							<Row type="flex" justify="center">
								<Col :xs="{span:24, order:1}" :sm="{span:11, order:1}" :md="{span:11, order:1}" :lg="{span:11, order:1}">
									<Row type="flex" justify="center" align="middle">
										<Col><span class="upload-text"> {{fileForm.name}}</span></Col>
									</Row>
								</Col>
								<Col :xs="{span:1, order:2}" :sm="{span:2, order:2}" :md="{span:2, order:2}" :lg="{span:2, order:2}">
									<Row type="flex" justify="center" align="middle">
										<Col><div class="uploading-animation"><img src="../../../assets/imgs/uploading.svg" /></div></Col>
									</Row>
								</Col>
								<Col :xs="{span:11, order:3}" :sm="{span:11, order:3}" :md="{span:11, order:3}" :lg="{span:11, order:3}">
									<Row type="flex" justify="center" align="middle">
										<Col><span class="upload-text">{{progress}} % / {{fileSizeFormat}}</span></Col>
									</Row>
								</Col>
								<Col :span="24" :order="4" style="margin-top:20px;">
									<Row type="flex" justify="center"><Button type="default" @click="onClickCancelUploading" :loading="isCancelingUploading">Cancel</Button></Row>
								</Col>
							</Row>
						</Col>
						<Col :span="24" class-name="file-uploader-top-area-uploaded" v-if="isUploaded">
							<Row type="flex" justify="center" align="middle" style="height:100%;">
								<Col :xs="24" :sm="12" :md="12" :lg="12" style="padding: 10px 0;"><Row type="flex" justify="center">
									<span class="upload-text">File is Ready to Upload !</span>
								</Row></Col>
								<Col :xs="24" :sm="12" :md="12" :lg="12" style="padding: 10px 0;"><Row type="flex" justify="center">
									<Button type="primary" @click="onClickReset">Reselect Another File</Button>
								</Row></Col>
							</Row>
						</Col>
					</Row>
					<Form ref="fileForm" :model="fileForm" :rules="fileFormRules" label-position="top">
						<Row type="flex" justify="space-between">
							<Col :xs="24" :sm="24" :md="24" :lg="6">
								<FormItem label="File Name" prop="filename">
									<Input v-model="fileForm.name"/>
								</FormItem>
							</Col>
							<Col :xs="24" :sm="24" :md="24" :lg="12">
								<Row type="flex" justify="space-between">
									<Col :xs="12" :sm="12" :md="12" :lg="6">
										<FormItem v-if="tempFile.size !== null" label="Size" prop="filesize">
											<p>{{fileSizeFormat}}</p>
										</FormItem>
									</Col>
									<Col :xs="12" :sm="12" :md="12" :lg="6">
										<FormItem v-if="tempFile.lastModified !== null" label="Last Update Date" prop="lastUpdateDate">
											<p>{{fileLastUpdateDateFormat}}</p>
										</FormItem>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row type="flex" justify="start">
							<Col :xs="24" :sm="24" :md="24" :lg="6">
								<FormItem label="Category" prop="category">
									<Select v-model="fileForm.category">
										<Option :value="1"><font-awesome-icon class="file-category-blue" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Tech</Option>
										<Option :value="2"><font-awesome-icon class="file-category-red" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Design</Option>
										<Option :value="3"><font-awesome-icon class="file-category-green" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Prototype</Option>
										<Option :value="4"><font-awesome-icon class="file-category-orange" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Document</Option>
									</Select>
								</FormItem>
							</Col>
						</Row>
						<Row type="flex" justify="start">
							<Col :span="24">
								<FormItem label="Tags" prop="category">
									<Row type="flex" :gutter="10">
										<template v-for="(item, index) in fileForm.tags">
											<Col><Tag :name="item" type="border" @on-close="onClickCloseTag" closable>{{tagsFormat[index]}}</Tag></Col>
										</template>
										<Col><Dropdown trigger="click" @on-click="onClickSelectTag">
											<a href="javascript:void(0)">Add Tag<Icon type="ios-arrow-down" /></a>
											<DropdownMenu slot="list">
												<template v-for="item of tagList">
													<DropdownItem :name="item.id">{{item.name}}</DropdownItem>
												</template>
											</DropdownMenu>
										</Dropdown></Col>
									</Row>
								</FormItem>
							</Col>
						</Row>
						<Row type="flex" justify="start">
							<Col :span="24">
								<FormItem label="Content">
									<Input v-model="fileForm.content" type="textarea" :autosize="{minRows: 3,maxRows: 5}"></Input>
								</FormItem>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
			<Row class-name="file-uploader-footer" type="flex" justify="center" :gutter="30">
				<Col><Button @click="onClickCancel">Cancel</Button></Col>
				<Col><Button type="primary" @click="onClickSubmit" :loading="isSubmitting" :disabled="!isFileSelected || isUploading">Submit</Button></Col>
			</Row>
		</Modal>
	</section>
</template>

<script>
import Api from '../../../facades/api'
import Utils from '../../../utils'
import Store from '../../../store/store'
import Enum from '../../../models/enum'

export default {
	name: 'file-uploader',
	props: {
		buttonText: String,
		transfer: {
			type: Boolean,
			default: true,
		},
		disabled: Boolean,
	},
	data() {
		return {
			isUploadModalVisible: false,
			isUploading: false,
			isCancelingUploading: false,
			isCanceled: false,
			isUploaded: false,
			isSubmitting: false,
			isFileSelected: false,

			tagList: [],
			progress: 0,

			tempFile: {
				name: '-',
				size: null,
				lastModified: null,
			},

			file: null,
			modalStyle: {
				'max-width': '1200px',
			},

			fileForm: {
				url: '',
				type: null,
				name: '',
				size: null,
				category: null,
				tags: [],
				content: '',
			},
			fileFormRules: {
			},
		}
	},
	computed: {
		circleColor() {
			let color = '#2db7f5'
			if (this.progress === 100) {
				color = '#5cb85c'
			}
			return color
		},
		fileSizeFormat() {
			return Utils.formatFileSize(this.tempFile.size)
		},
		fileLastUpdateDateFormat() {
			return Utils.formatDate(this.tempFile.lastModified)
		},
		tagsFormat() {
			const arr = []
			this.fileForm.tags.forEach((item) => {
				arr.push(Store.fileTag(item))
			})
			return arr
		},
	},
	methods: {
		onClickUpload() {
			this.resetUpload()
			this.isUploadModalVisible = true
		},
		onClickSubmit() {
			this.addFile()
		},
		onClickCancel() {
			if (this.isUploading) this.onClickCancelUploading()
			this.resetUpload()
			this.isUploadModalVisible = false
		},
		onClickSelect(file) {
			this.tempFile = file
			this.fileForm.name = this.tempFile.name
			this.fileForm.size = this.tempFile.size
			this.getFileType(this.tempFile.type)
			this.isFileSelected = true
			this.uploadFile()
			return false
		},
		onClickCancelUploading() {
			this.isCancelingUploading = true
			Api.cancelRequest.upload('cancel uploading')
			this.isCancelingUploading = false
		},
		onClickReset() {
			this.resetUpload()
		},
		onClickSelectTag(id) {
			if (this.fileForm.tags.length >= 3) {
				this.$Message.info('up to 3 tags')
				return
			}
			for (const item of this.fileForm.tags) {
				if (item === id) {
					this.$Message.info('tag exists')
					return
				}
			}
			this.fileForm.tags.push(id)
		},
		onClickCloseTag(event, name) {
			this.fileForm.tags.forEach((item, index) => {
				if (item === name) this.fileForm.tags.splice(index, 1)
			})
		},

		resetUpload() {
			this.isFileSelected = false
			this.isUploaded = false
			this.isCanceled = false
			this.progress = 0
			this.tempFile = {
				name: '-',
				size: null,
				lastModified: null,
			}
			this.fileForm = {
				url: '',
				type: null,
				name: '',
				size: null,
				category: null,
				tags: [],
				content: '',
			}
		},
		getFileType(type) {
			switch (type.slice(0, type.indexOf('/'))) {
				case 'image':
					this.fileForm.type = Enum.FileType.Image
					break
				case 'application':
					this.fileForm.type = Enum.FileType.Pdf
					break
				case 'audio':
					this.fileForm.type = Enum.FileType.Audio
					break
				default: {
					this.fileForm.type = Enum.FileType.Unknown
					break
				}
			}
		},
		onProgress(progress) {
			this.progress = progress
		},
		onCancel(message) {
			this.isCanceled = true
			this.isCancelingUploading = false
			this.$Message.info(message)
		},
		async uploadFile() {
			try {
				this.isUploading = true
				const res = await Api.file.upload(this.tempFile, this.onProgress, this.onCancel)
				this.fileForm.url = res.fileUrl
				// TODO for test
				if (this.fileForm.type === Enum.FileType.Image) this.fileForm.thumbUrl = this.fileForm.url
				//
				this.isUploading = false
				this.isUploaded = true
			} catch (error) {
				if (!this.isCanceled) {
					this.$Message.error('read file failed, please try again.')
				}
				this.isUploading = false
			}
		},
		async addFile() {
			try {
				this.isSubmitting = true
				await Api.file.add(this.fileForm)
				this.isSubmitting = false
				this.$Message.info('Upload file successfully !')
				this.$emit('on-upload', this.fileForm.url)
				this.isUploadModalVisible = false
				this.resetUpload()
			} catch (error) {
				this.isSubmitting = false
				this.$Message.error('submit failed.')
			}
		},
		init() {
			this.isUploadModalVisible = false
			this.isUploading = false
			this.isFileSelected = false
			this.tagList = JSON.parse(sessionStorage.getItem('tagList'))
		},
	},
	mounted() {
		this.init()
	},
}
</script>

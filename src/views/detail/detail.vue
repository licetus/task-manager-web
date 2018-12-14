<style lang="less">
@import './detail.less';
</style>

<template>
	<div id="detail">
		<div id="detail-operation-bar">
			<Row class-name="top-bar-buttons" type="flex" justify="space-between" align="middle">
				<Col><Row type="flex" justify="start" :gutter="10">
					<Col><Button @click="onClickView" ghost>View</Button></Col>
					<Col><Button @click="onClickEdit" ghost>Edit</Button></Col>
				</Row></Col>
				<Col class-name="close-button"><a href="javascript:void(0)" @click.prevent="onClickClose"><Icon type="md-close" size="24" color="white" style="margin-right:5px;"/></a></Col>
			</Row>
		</div>

		<Row id="detail-content" type="flex" justify="center">
			<Col id="detail-content-file-display">
				<Row id="detail-content-file-display-container" type="flex" justify="center" align="middle">
					<div :id="`detail-content-file-display-card-${fileTypeClass}`">
						<ImageDisplayer :src="fileUrl" v-if="this.file.fileType === fileTypeEnum.Image"></ImageDisplayer>
						<AudioPlayer :src="fileUrl" :width="500" :height="250" v-if="this.file.fileType === fileTypeEnum.Audio"></AudioPlayer>
						<PDFReader :src="fileUrl" v-if="this.file.fileType === fileTypeEnum.Pdf"></PDFReader>
					</div>
				</Row>
			</Col>
			<Col id="detail-content-file-side">
				<Form label-position="top">
					<Row class-name="detail-content-file-side-block" type="flex" justify="start">
						<Col :span="24"><FormItem label="File Name: "><p>{{file.filename}}</p></FormItem></Col>
						<Col :span="24"><FormItem label="Size: "><p>{{fileSizeFormat}}</p></FormItem></Col>
						<Col :span="12"><FormItem label="Upload Date: "><p>{{fileUploadDate}}</p></FormItem></Col>
						<Col :span="12"><FormItem label="Last Modified Date: "><p>{{fileLastUpdateDate}}</p></FormItem></Col>
					</Row>
					<Row class-name="detail-content-file-side-block" type="flex" justify="start">
						<Col :span="24"><FormItem label="Category: "><p>{{categoryFormat}}</p></FormItem></Col>
						<Col :span="24"><FormItem label="Tags: ">
							<Row id="detail-content-file-side-tags" type="flex" justify="start" :gutter="20">
								<template v-for="(item, index) in fileForm.tags">
									<Col><a href="javascript:void(0)" @click.prevent="onClickTag(index)">#{{tagsFormat[index]}}#</a></Col>
								</template>
							</Row>
						</FormItem></Col>
					</Row>
					<Row class-name="detail-content-file-side-block" type="flex" justify="start">
						<Col><FormItem label="Description: "><p>{{file.fileContent}}</p></FormItem></Col>
					</Row>
					<div id="recent-div">
						<FormItem label="Recently: "></FormItem>
						<div id="detail-content-file-side-recent">
							<Row type="flex" justify="start" :gutter="10">
								<template v-for="item of recentFiles">
									<Col><InfoCard :params="item" :size="1"></InfoCard></Col>
								</template>
							</Row>
						</div>
					</div>
				</Form>
			</Col>
		</Row>

		<!-- Drawer -->
		<Drawer v-model="isDrawerOpening" title="Edit" :mask-closable="false">
			<Form ref="fileForm" :model="fileForm" :rules="fileFormRule" label-position="top">
				<Row type="flex" justify="space-between">
					<Col :xs="24" :sm="24" :md="24" :lg="24"><Row type="flex" justify="space-between">
						<Col :span="24">
							<FormItem label="File Name" prop="filename"><Input v-model="fileForm.name"/></FormItem>
						</Col>
						<Col :span="12">
							<FormItem label="Upload Date" prop="uploadDate"><p>{{fileUploadDate}}</p></FormItem>
						</Col>
						<Col :span="12">
							<FormItem label="Last Modified Date" prop="lastUpdateDate"><p>{{fileLastUpdateDate}}</p></FormItem>
						</Col>
						<Col :span="12">
							<FormItem label="Category" prop="category">
								<Select v-model="fileForm.category">
									<Option :value="1"><font-awesome-icon class="file-category-blue" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Tech</Option>
									<Option :value="2"><font-awesome-icon class="file-category-red" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Design</Option>
									<Option :value="3"><font-awesome-icon class="file-category-green" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Prototype</Option>
									<Option :value="4"><font-awesome-icon class="file-category-orange" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Document</Option>
								</Select>
							</FormItem>
						</Col>
					</Row></Col>
					<Col :xs="24" :sm="24" :md="24" :lg="24"><Row type="flex" justify="space-between">
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
						<Col :span="24">
							<FormItem label="Content">
								<Input v-model="fileForm.content" type="textarea" :autosize="{minRows: 5,maxRows: 9}"></Input>
							</FormItem>
						</Col>
					</Row></Col>
				</Row>
			</Form>
			<Row id="detail-content-file-side-buttons" type="flex" justify="space-between">
				<Col><Button type="error" @click="onClickDelete" :loading="isDeleting" :disabled="isSubmitting" ghost>Delete</Button></Col>
				<Col><Row type="flex" justify="end" :gutter="10">
					<Col><Button @click="isDrawerOpening = false" :disabled="isSubmitting || isDeleting">Cancle</Button></Col>
					<Col><Button type="primary" @click="onClickSubmit" :loading="isSubmitting" :disabled="isDeleting">Submit</Button></Col>
				</Row></Col>
			</Row>
		</Drawer>


	</div>
</template>

<script>
import Api from '../../facades/api'
import Utils from '../../utils'
import Store from '../../store/store'
import Enum from '../../models/enum'

export default {
	data() {
		return {
			fileTypeEnum: Enum.FileType,
			isDrawerOpening: false,
			isSubmitting: false,
			isDeleting: false,
			divWidth: 300,
			tagList: [],

			recentFilesOrigin: [],
			recentFiles: [],
			fakeCardNumber: 0,
			fakeCardStyle: '',

			file: {
				id: null,
				fileUrl: '',
				thumbUrl: '',
				fileType: 0,
				filename: '',
				fileCategory: null,
				fileTags: [],
				fileContent: '',
				fileSize: null,
				fileUploadTime: null,
				fileLastUpdateTime: null,
			},
			fileForm: {
				name: '',
				category: null,
				tags: [],
				content: '',
				thumbUrl: '',
			},
			fileFormRule: {},
		}
	},
	watch: {
		$route() {
			this.initPage()
		},
	},
	computed: {
		fileUrl() {
			if (this.file.fileUrl && this.file.fileUrl !== '') {
				const url = `http:${Store.host()}${this.file.fileUrl}`
				return url
			}
			return null
		},
		fileTypeClass() {
			return `${Store.fileTypeClass(this.file.fileType)}`
		},
		fileSizeFormat() {
			return Utils.formatFileSize(this.file.fileSize)
		},
		fileUploadDate() {
			return Utils.formatDate(this.file.fileUploadTime)
		},
		fileLastUpdateDate() {
			return Utils.formatDate(this.file.fileLastUpdateTime)
		},
		categoryFormat() {
			return Store.fileCategory(this.file.fileCategory)
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
		onClickView() {
			window.open(this.fileUrl)
		},
		onClickEdit() {
			this.resetFileForm()
			this.isDrawerOpening = true
		},
		onClickTag(index) {
			this.$Message.info(`on click tag #${this.tagsFormat[index]}#`)
		},
		onClickClose() {
			this.$router.push('/')
		},
		onClickSubmit() {
			this.isSubmitting = true
			this.submitFile()
		},
		onClickDelete() {
			this.$Modal.confirm({
				title: 'Are you sure to DELETE this file ?',
				onOk: () => {
					this.isDeleting = true
					this.deleteFile()
				},
			})
		},
		onClickSelectTag(id) {
			if (this.fileForm.tags.length >= 3) {
				this.$Message.info('up to 3 tags.')
				return
			}
			for (const item of this.fileForm.tags) {
				if (item === id) {
					this.$Message.info('tag exists.')
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

		resetFileForm() {
			this.fileForm = {
				name: this.file.filename,
				category: this.file.fileCategory,
				tags: this.file.fileTags,
				content: this.file.fileContent,
			}
		},

		formatFileDisplay() {

		},

		getFileType(type) {
			switch (type.slice(0, type.indexOf('/'))) {
				case 'image':
					this.fileForm.type = 1
					break
				case 'application':
					this.fileForm.type = 2
					break
				case 'audio':
					this.fileForm.type = 3
					break
				default: {
					this.fileForm.type = 0
					break
				}
			}
		},
		async fetchFile() {
			try {
				const res = await Api.file.fetch(this.$route.params.id)
				this.file = {
					id: res.id,
					fileUrl: res.url,
					thumbUrl: res.thumbUrl,
					fileType: res.type,
					filename: res.name,
					fileCategory: res.category,
					fileTags: res.tags,
					fileContent: res.content,
					fileSize: res.size,
					fileUploadTime: res.createTime,
					fileLastUpdateTime: res.lastUpdateTime,
				}
				this.fileForm = {
					name: this.file.filename,
					category: this.file.fileCategory,
					tags: this.file.fileTags,
					content: this.file.fileContent,
				}
			} catch (e) {
				this.$Message.info('fetch file list failed.')
			}
		},
		async fetchRecentFiles() {
			try {
				const files = []
				const res = await Api.file.fetchRecentList()
				if (res.length === 0) this.recentFiles = []
				else {
					res.forEach((item) => {
						const file = {
							id: item.id,
							fileType: item.type,
							fileUrl: item.url,
							thumbUrl: item.thumbUrl,
							filename: item.name,
							fileCategory: item.category,
							fileTags: item.tags,
							fileContent: item.content,
							fileSize: item.size,
							fileUploadTime: item.createTime,
							fileLastUpdateTime: item.lastUpdateTime,
						}
						files.push(file)
					})
					this.recentFilesOrigin = files
					this.generateRecentFiles()
				}
			} catch (e) {
				this.$Message.info('fetch recent file list failed.')
			}
		},
		async submitFile() {
			try {
				const params = {
					name: this.fileForm.name,
					category: this.fileForm.category,
					tags: this.fileForm.tags,
					content: this.fileForm.content,
					thumbUrl: this.fileForm.thumbUrl,
				}
				await Api.file.update(params, this.file.id)
				this.isSubmitting = false
				this.isDrawerOpening = false
				this.$Message.info('submit data successfully !')
				this.fetchFile()
			} catch (e) {
				this.isSubmitting = false
			}
		},
		async deleteFile() {
			try {
				await Api.file.delete(this.file.id)
				this.isDeleting = false
				this.$Message.info('delete file successfully !')
				this.$router.push('/')
			} catch (e) {
				this.isDeleting = false
			}
		},
		generateRecentFiles() {
			if (!this.recentFilesOrigin || this.recentFilesOrigin.length === 0) return
			const { divWidth } = this
			const cardWidth = 125
			const l = this.recentFilesOrigin.length
			const n = l % parseInt(((divWidth + 10) / (cardWidth + 10)), 10)
			const files = this.recentFilesOrigin.slice(0, l - n)
			this.recentFiles = files
		},

		listenClientSize() {
			const _this = this
			window.onresize = () => {
				_this.divWidth = document.getElementById('detail-content-file-side-recent').offsetWidth
				_this.generateRecentFiles()
				// _this.contentHeight = `height: ${parseInt(document.body.clientHeight + document.documentElement.clientHeight - 60)}px;`
			}
		},
		initPage() {
			this.tagList = JSON.parse(sessionStorage.getItem('tagList'))
			this.isDrawerOpening = false
			this.fetchFile()
			this.fetchRecentFiles()
			this.divWidth = document.getElementById('detail-content-file-side-recent').offsetWidth
		},
	},
	mounted() {
		this.initPage()
		this.listenClientSize()
	},
}
</script>

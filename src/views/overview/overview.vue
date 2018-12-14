<style lang="less">
	@import './overview.less';
</style>

<template>
	<div id="overview">
		<!-- carousel -->
		<Row id="carousel"><Col :xs="0" :sm="24" :md="24" :lg="24">
			<Carousel v-model="carousel" loop>
				<CarouselItem>
					<div class="carousel-content"><img class="carousel-img" style="object-fit:cover;object-position:center;" src="../../assets/imgs/banner_01.jpg"/></div>
				</CarouselItem>
				<CarouselItem>
					<div class="carousel-content"><img class="carousel-img" style="object-fit:cover;object-position:center;" src="../../assets/imgs/banner_02.jpg"/></div>
				</CarouselItem>
				<CarouselItem>
					<div class="carousel-content"><img class="carousel-img" style="object-fit:cover;object-position:center;" src="../../assets/imgs/banner_03.jpg"/></div>
				</CarouselItem>
			</Carousel>
		</Col></Row>
		<!-- content -->
		<div id="content">
			<!-- upload -->
			<div id="upload-button">
				<Row type="flex" justify="start">
					<Col><FileUploader
					buttonText="Upload File"
					:disabled="isLoading"
					@on-upload="fetchFileList"
					></FileUploader></Col>
				</Row>
			</div>
			<!-- filters -->
			<div id="filters">
				<Row type="flex" justify="space-between">
					<Col><Row type="flex" justify="start" :gutter="20">
						<!-- filter all -->
						<Col class-name="filter-button" id="filter-all-button"><Button size="large" @click="onClickFilterReset" :disabled="isLoading"><Icon type="md-options" class="filters-icon-left" /> All Filters</Icon></Button></Col>
						<!-- filter path -->
						<Col class-name="filter-button"><Dropdown trigger="click" @on-click="onClickFilterPath">
							<Button size="large" :type="filters.path.val.length > 0 ? 'primary' : 'default'" :ghost="filters.path.val.length > 0" :disabled="isLoading">Path <Icon type="md-arrow-dropdown" class="filters-icon-right" /></Button>
							<DropdownMenu slot="list">
								<template v-for="item in filePaths">
									<Dropdown v-if="item.children && item.children.length > 0" trigger="click" placement="right-start">
										<DropdownItem class="path-item">{{item.val}} <Icon type="md-arrow-dropright" class="filters-icon-right" /></DropdownItem>
										<DropdownMenu v-if="item.children.length > 0" slot="list">
											<DropdownItem :name="JSON.stringify([item.id])">/</DropdownItem>
											<template v-for="child of item.children">
												<Dropdown v-if="child.children && child.children.length > 0" trigger="click" placement="right-start">
													<DropdownItem class="path-item">{{child.val}} <Icon type="md-arrow-dropright" class="filters-icon-right" /></DropdownItem>
													<DropdownMenu v-if="child.children.length > 0" slot="list">
														<DropdownItem :name="JSON.stringify([item.id, child.id])">/</DropdownItem>
														<template v-for="child2 of child.children">
															<DropdownItem :name="JSON.stringify([item.id, child.id, child2.id])">{{child2.val}}</DropdownItem>
														</template>
													</DropdownMenu>
												</Dropdown>
												<DropdownItem v-else :name="JSON.stringify([item.id, child.id])">{{child.val}}</DropdownItem>
											</template>
										</DropdownMenu>
									</Dropdown>
									<DropdownItem v-else :name="JSON.stringify([item.id])">{{item.val}}</DropdownItem>
								</template>
							</DropdownMenu>
						</Dropdown></Col>
						<!-- filter type -->
						<Col class-name="filter-button"><Dropdown @on-click="onClickFilterType" trigger="click">
							<Button size="large" :type="filters.type.val !== 0 ? 'primary' : 'default'" :ghost="filters.type.val !== 0" :disabled="isLoading">Type <Icon type="md-arrow-dropdown" class="filters-icon-right" /></Button>
							<DropdownMenu slot="list">
								<DropdownItem :name="1">Image</DropdownItem>
								<DropdownItem :name="2">Pdf</DropdownItem>
								<DropdownItem :name="3">Audio</DropdownItem>
							</DropdownMenu>
						</Dropdown></Col>
						<!-- filter category -->
						<Col class-name="filter-button"><Dropdown @on-click="onClickFilterCategory" trigger="click">
							<Button size="large" :type="filters.category.val !== 0 ? 'primary' : 'default'" :ghost="filters.category.val !== 0" :disabled="isLoading">Category <Icon type="md-arrow-dropdown" class="filters-icon-right" /></Button>
							<DropdownMenu slot="list">
								<DropdownItem :name="1"><font-awesome-icon class="file-category-blue" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Tech</DropdownItem>
								<DropdownItem :name="2"><font-awesome-icon class="file-category-red" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Design</DropdownItem>
								<DropdownItem :name="3"><font-awesome-icon class="file-category-green" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Prototype</DropdownItem>
								<DropdownItem :name="4"><font-awesome-icon class="file-category-orange" icon="circle" style="font-size:10px;margin: 0 5px 1px 0;"/>Document</DropdownItem>
							</DropdownMenu>
						</Dropdown></Col>
						<!-- filter tags -->
						<Col class-name="filter-button"><Dropdown trigger="click">
							<Button size="large" :type="filters.tags.val.length > 0 ? 'primary' : 'default'" :ghost="filters.tags.val.length > 0" :disabled="isLoading">Tag <Icon type="md-arrow-dropdown" class="filters-icon-right" /></Button>
							<DropdownMenu slot="list">
									<CheckboxGroup v-model="filters.tags.val"  @on-change="onClickFilterTag">
										<DropdownItem><Checkbox :label="1"><span>Sketch</span></Checkbox></DropdownItem>
										<DropdownItem><Checkbox :label="2"><span>Art</span></Checkbox></DropdownItem>
										<DropdownItem><Checkbox :label="3"><span>Budget</span></Checkbox></DropdownItem>
										<DropdownItem><Checkbox :label="4"><span>Abandoned</span></Checkbox></DropdownItem>
										<DropdownItem><Checkbox :label="5"><span>Emergency</span></Checkbox></DropdownItem>
								</CheckboxGroup>
							</DropdownMenu>
						</Dropdown></Col>
					</Row></Col>
					<Col><Row type="flex" justify="end">
						<Col id="view-type-switch"><RadioGroup v-model="viewType" type="button">
								<Radio :label="2"><font-awesome-icon icon="list-ul" size="1x" /></Radio>
								<Radio :label="0"><font-awesome-icon icon="th" size="1x" /></Radio>
							</RadioGroup></Col>
					</Row></Col>
				</Row>
			</div>
			<!-- file list -->
			<div id="cards">
				<!-- filter tags -->
				<Row id="filter-tags" type="flex" :gutter="15">
					<!-- path tags -->
					<Col class-name="filter-tag" id="filter-tag-path" v-if="filters.path.val.length > 0"><Button type="primary" size="small" ghost @click="onClickClearFilterPath" :disabled="isLoading">{{filterPathTag}}/</Button></Col>
					<!-- type tags -->
					<Col class-name="filter-tag" v-if="filters.type.val !== 0"><Button type="primary" size="small" ghost @click="onClickClearFilterType" :disabled="isLoading">{{filterTagsType}}</Button></Col>
					<!-- category tags -->
					<Col class-name="filter-tag" v-if="filters.category.val !== 0"><Button type="primary" size="small" ghost @click="onClickClearFilterCategory" :disabled="isLoading">{{filterTagsCategory}}</Button></Col>
					<!-- tag tags -->
					<template v-if="filters.tags.val.length > 0">
						<Col class-name="filter-tag" v-for="(item, index) in filterTagsTags" :key="index"><Button type="primary" size="small" ghost @click="onClickClearFilterTag(index)" :disabled="isLoading">#{{item}}#</Button></Col>
					</template>
				</Row>
				<!-- sort by -->
				<Row id="sort-by" type="flex">
					<Col><span class="sort-by-text" style="margin-right: 8px;">Sort by: </span><Dropdown @on-click="onClickSort" trigger="click">
						<a href="javascript:void(0)" class="sort-by-text">{{sortMapping[sortBy]}} <Icon type="md-arrow-dropdown"></Icon></a>
						<DropdownMenu slot="list">
							<DropdownItem :name="1" :disabled="isLoading">{{sortMapping[1]}}</DropdownItem>
							<DropdownItem :name="2" :disabled="isLoading">{{sortMapping[2]}}</DropdownItem>
							<DropdownItem :name="3" :disabled="isLoading">{{sortMapping[3]}}</DropdownItem>
							<DropdownItem :name="4" :disabled="isLoading">{{sortMapping[4]}}</DropdownItem>
						</DropdownMenu>
					</Dropdown></Col>
				</Row>
				<!-- files -->
				<Row type="flex" justify="center" :gutter="25">
					<template v-for="item of files">
						<Col :span="viewType > 1 ? 24 : null">
							<InfoCard
							:params="item"
							:size="viewType"
							:disabled="isLoading"
							@on-click-icon="onClickFilterType"
							@on-click-category="onClickFilterCategory"
							@on-click-tag="onClickFilterTag"
							></InfoCard>
						</Col>
					</template>
					<template v-if="fakeCardNumber !== 0" v-for="item in fakeCardNumber">
						<Col><div :style="fakeCardStyle"></div></Col>
					</template>
				</Row>
			</div>
		</div>
	</div>
</template>

<script>
import Api from '../../facades/api'
import Utils from '../../utils'
import Store from '../../store/store'

export default {
	data() {
		return {
			divWidth: 1120,
			isLoading: false,
			carousel: 0,
			list: {
				isLoading: false,
				total: 0,
				pagesize: 100,
				page: 0,
				filter: '',
				orderBy: '',
			},
			sortBy: 2,
			sortMapping: ['', 'Type', 'Size', 'Upload Date', 'Last Modified Date'],
			filters: {
				type: {
					val: 0,
					sql: '',
				},
				category: {
					val: 0,
					sql: '',
				},
				tags: {
					val: [],
					sql: '',
				},
				path: {
					val: [],
					sql: '',
				},
			},

			filePaths: [
				{
					id: 1,
					val: 'UI design',
					children: [
						{
							id: 1,
							val: 'sketch',
							children: [
								{
									id: 1,
									val: 'prototypes',
								},
							],
						},
						{
							id: 2,
							val: 'photoshop',
						},
						{
							id: 3,
							val: 'illustrator',
						},
					],
				},
				{
					id: 2,
					val: 'Projects',
					children: [
						{
							id: 4,
							val: 'Aerolink',
							children: [
								{
									id: 1,
									val: 'Aerolink_Admin',
								},
								{
									id: 2,
									val: 'Aerolink_Client',
								},
							],
						},
						{
							id: 5,
							val: 'Shirong-Finance',
						},
						{
							id: 6,
							val: 'Bip',
						},
					],
				},
				{
					id: 3,
					val: 'Others',
				},
			],

			viewType: 0,

			fakeCardNumber: 0,
			fakeCardStyle: '',
			files: [],

		}
	},
	computed: {
		listButtonClass() {
			if (this.viewType === 0) return 'view-type-button'
			return 'view-type-button-active'
		},
		cardButtonClass() {
			if (this.viewType === 1) return 'view-type-button'
			return 'view-type-button-active'
		},
		filterTagsType() {
			if (this.filters.type.val !== 0) return Store.fileType(this.filters.type.val)
			return 'Unknown'
		},
		filterTagsCategory() {
			if (this.filters.category.val !== 0) return Store.fileCategory(this.filters.category.val)
			return 'Unknown'
		},
		filterTagsTags() {
			const tags = []
			if (this.filters.tags.val.length > 0) {
				this.filters.tags.val.forEach((item) => {
					tags.push(Store.fileTag(item))
				})
				return tags
			}
			return []
		},
		filterPathTag() {
			if (this.filters.path.val && this.filters.path.val.length > 0) {
				const stringArr = []
				const pathArr = this.filters.path.val
				if (pathArr[0]) {
					for (const father of this.filePaths) {
						if (pathArr[0] === father.id) {
							stringArr.push(father.val)
							if (pathArr[1] && father.children) {
								for (const child1 of father.children) {
									if (pathArr[1] === child1.id) {
										stringArr.push(child1.val)
										if (pathArr[2] && child1.children) {
											for (const child2 of child1.children) {
												if (pathArr[2] === child2.id) {
													stringArr.push(child2.val)
													break
												}
											}
										}
										break
									}
								}
							}
							break
						}
					}
				}
				return stringArr.join('/')
			}
			return ''
		},
	},
	methods: {
		onClickFilterType(type) {
			if (type) {
				this.filters.type.val = type
				this.filters.type.sql = `type=${type}`
				this.onClickFilter()
			}
		},
		onClickFilterCategory(category) {
			if (category) {
				this.filters.category.val = category
				this.filters.category.sql = `category=${category}`
				this.onClickFilter()
			}
		},
		onClickFilterTag(tags) {
			if (tags.length > 0) {
				this.filters.tags.val = tags
				this.filters.tags.sql = `tags&&array[${tags}]`
			}
			this.onClickFilter()
		},

		onClickFilterPath(name) {
			if (name) {
				this.filters.path.val = JSON.parse(name)
			}
			// TODO: require api support
		},
		onClickClearFilterType() {
			this.filters.type.val = 0
			this.filters.type.sql = ''
			this.onClickFilter()
		},
		onClickClearFilterCategory() {
			this.filters.category.val = 0
			this.filters.category.sql = ''
			this.onClickFilter()
		},
		onClickClearFilterTag(index) {
			this.filters.tags.val.splice(index, 1)
			if (this.filters.tags.val.length > 0) this.filters.tags.sql = `tags&&array[${this.filters.tags.val}]`
			else this.filters.tags.sql = ''
			this.onClickFilter()
		},
		onClickClearFilterPath() {
			this.filters.path.val = []
			// TODO: require api support
		},
		onClickFilterReset() {
			this.filters.type.val = 0
			this.filters.type.sql = ''
			this.filters.category.val = 0
			this.filters.category.sql = ''
			this.filters.tags.val = []
			this.filters.tags.sql = ''
			this.list.filter = ''
			this.isLoading = true
			this.fetchFileList()
		},
		onClickFilter() {
			this.generateFilterQuery()
			this.isLoading = true
			this.fetchFileList()
		},
		onClickSort(name) {
			this.sortBy = name
			this.generateSortQuery(name)
			this.isLoading = true
			this.fetchFileList()
		},
		// onClickListView() {
		// 	if (this.viewType === 0) this.viewType = 2
		// },
		// onClickCardView() {
		// 	if (this.viewType === 2) this.viewType = 0
		// },
		generateFilterQuery() {
			const filterArray = []
			for (const item of Object.keys(this.filters)) {
				if (this.filters[item].sql && this.filters[item].sql !== '') filterArray.push(this.filters[item].sql)
			}
			const filter = filterArray.join('#')
			this.list.filter = filter
		},
		generateSortQuery() {
			switch (this.sortBy) {
				case 1:
					this.list.orderBy = 'size'
					break
				case 2:
					this.list.orderBy = 'createTime'
					break
				case 3:
					this.list.orderBy = 'type'
					break
				case 4:
					this.list.orderBy = 'lastUpdateTime'
					break
				default:
			}
		},
		async fetchTagList() {
			try {
				const res = await Api.tag.fetchList()
				sessionStorage.setItem('tagList', JSON.stringify(res.items.reverse()))
			} catch (e) {
				Utils.errorHandler(e)
			}
		},
		async fetchFileList() {
			try {
				const files = []
				const res = await Api.file.fetchList(this.list.pagesize, this.list.page, this.list.filter, this.list.orderBy)
				if (res.items.length === 0) this.files = []
				else {
					res.items.forEach((item) => {
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
						}
						files.push(file)
					})
					this.files = files
					this.addFakeCard()
				}
				this.isLoading = false
			} catch (e) {
				this.isLoading = false
			}
		},
		addFakeCard() {
			if (this.files.length > 0) {
				const { divWidth } = this
				const cardWidth = 350
				const m = parseInt((divWidth / cardWidth), 10)
				const n = m - (this.files.length % m)
				if (n !== m) {
					this.fakeCardNumber = n
					this.fakeCardStyle = `width: ${cardWidth}px;`
				}
			}
		},
		listenClientSize() {
			const _this = this
			window.onresize = () => {
				_this.divWidth = document.getElementById('cards').offsetWidth
				_this.addFakeCard()
			}
		},
		initPage() {
			this.isLoading = true
			this.fetchTagList()
			this.fetchFileList()
			this.divWidth = document.getElementById('cards').offsetWidth
		},
	},
	mounted() {
		this.initPage()
		this.listenClientSize()
	},
}
</script>

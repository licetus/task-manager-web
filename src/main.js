import Vue from 'vue'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
import VueRouter from 'vue-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFile, faFileImage, faFilePdf, faFileAudio, faCircle, faListUl, faTh } from '@fortawesome/free-solid-svg-icons'

import 'iview/dist/styles/iview.css'
import 'pdfjs-dist/web/pdf_viewer.css'

import store from './store'
import Routers from './router'
import Utils from './utils'
import App from './app.vue'
import Public from './views/public'


Vue.use(VueRouter)
Vue.use(iView, { locale })
Vue.use(Public)

library.add(faFile, faFileImage, faFilePdf, faFileAudio, faCircle, faListUl, faTh)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// router config
const RouterConfig = {
	mode: 'history',
	routes: Routers,
}
const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start()
	Utils.title(to.meta.title)
	next()
})

router.afterEach(() => {
	iView.LoadingBar.finish()
	window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
})

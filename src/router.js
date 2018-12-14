const routers = [
	{
		path: '/',
		mata: {
			titie: 'Home Page'
		},
		component: (resolve) => require(['./views/index.vue'], resolve),
		children: [
			{
				path: '/',
				component: (resolve) => require(['./views/overview/overview.vue'], resolve),
			},
		]
	},
	{
		path: '/file/:id(\\d+)',
		meta: {
			title: 'File Details'
		},
		component: (resolve) => require(['./views/detail/detail.vue'], resolve),
	},
	{
		path: '/login',
		meta: {
			title: 'Login'
		},
		component: (resolve) => require(['./views/login/login.vue'], resolve),
	},
]
export default routers

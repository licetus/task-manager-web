#!/usr/bin/env babel-node --

import fs from 'fs'
import mkdirp from 'mkdirp'
import commander from 'commander'
import upperCamelCase from 'uppercamelcase'
import { ViewTemplate, PublicComponentIndex } from './templates/newView'

commander
	.version('0.1.0')
	.option('-t, --test', 'This is test option')
	.option('-n, --new [name]', 'Add a new view [name]')
	.option('-p, --public [name]', 'Add a new public componenet [name]')
	.option('-P, --path <path>', 'In path <path>', '')
	.parse(process.argv)

const basePath = 'src/views'
// let viewName = 'newView'
// let viewPath = basePath
// if (args.length > 0) [viewName] = args
// if (args.length > 1) viewPath += args[1]
// viewPath = `${viewPath}/${viewName}`

class ViewData {
	constructor(name, path, type) {
		this.name = name
		this.path = path
		this.type = type
		this.fs = fs
	}

	build() {
		if (this.path !== basePath) {
			mkdirp(this.path, (err) => {
				if (err) throw (err)
				else this.mkfile()
			})
		}
	}

	mkfile() {
		this.mkVue()
		this.mkLess()
		if (this.type === 'public') {
			this.mkIndex()
			this.addComponent()
		}
		console.log(`add new view [${this.name}] in <${this.path}> successfully.`)
	}

	mkVue() {
		const vuePath = `${this.path}/${this.name}.vue`
		fs.open(vuePath, 'w', (err, fd) => {
			if (err) throw err
			const { buffer } = new ViewTemplate(this.name, this.type)
			fs.write(fd, buffer, 0, buffer.length, 0, (err, written, buffer) => {})
		})
	}

	mkLess() {
		const lessPath = `${this.path}/${this.name}.less`
		fs.open(lessPath, 'w', (err, fd) => {
			if (err) throw err
		})
	}

	mkIndex() {
		const indexPath = `${this.path}/index.js`
		fs.open(indexPath, 'w', (err, fd) => {
			if (err) throw err
			const { buffer } = new PublicComponentIndex(this.name)
			fs.write(fd, buffer, 0, buffer.length, 0, (err, written, buffer) => {})
		})
	}

	addComponent() {
		const indexPath = `${basePath}/public/index.js`
		fs.readFile(indexPath, 'utf-8', (err, data) => {
			if (err) throw err
			const upperName = upperCamelCase(this.name)
			const importString = `$1\nimport ${upperName} from './${this.name}'\n$2`
			const registerString = `$1\n\t\tVue.component('${upperName}', ${upperName})\n$2`
			const regexpOfImport = /(')\n(\nconst Public = {)/
			const regexpOfRegister = /(\))\n(\t},\n}\n\nexport default Public)/
			const buffer = data.replace(regexpOfImport, importString).replace(regexpOfRegister, registerString)
			fs.open(indexPath, 'w', (err, fd) => {
				if (err) throw err
				fs.write(fd, buffer, 0, buffer.length, 0, (err, written, buffer) => {})
			})
		})
	}
}


if (commander.new) {
	const fileName = typeof commander.new === 'string' ? commander.new : 'newView'
	const filePath = `${basePath}${commander.path}/${fileName}`
	const view = new ViewData(fileName, filePath)
	view.build()
}

if (commander.public) {
	const fileName = typeof commander.public === 'string' ? commander.public : 'newComponent'
	const filePath = `${basePath}/public${commander.path}/${fileName}`
	const view = new ViewData(fileName, filePath, 'public')
	view.build()
}

if (commander.test) {
}

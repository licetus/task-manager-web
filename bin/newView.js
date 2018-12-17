#!/usr/bin/env node
import fs from 'fs'
import mkdirp from 'mkdirp'
import commander from 'commander'
import ViewTemplate from './templates/newView'

const basePath = 'src/views'
const args = process.argv.splice(2)
let viewName = 'newView'
let viewPath = basePath
if (args.length > 0) [viewName] = args
if (args.length > 1) viewPath += args[1]
viewPath = `${viewPath}/${viewName}`

const resolveArgs = (args) => {


}

class ViewData {
	constructor(name, path, type) {
		this.name = name
		this.path = path
		this.type = type
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
		const vuePath = `${this.path}/${this.name}.vue`
		fs.open(vuePath, 'w', (err, fd) => {
			if (err) throw err
			const { buffer } = new ViewTemplate(viewName, this.type)
			fs.write(fd, buffer, 0, buffer.length, 0, (err, written, buffer) => {})
		})
		const lessPath = `${this.path}/${this.name}.less`
		fs.open(lessPath, 'w', (err, fd) => {
			if (err) throw err
		})
	}
}

const view = new ViewData(viewName, viewPath, 'public')
view.build()

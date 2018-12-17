import fs from 'fs'
import mkdirp from 'mkdirp'
import ViewTemplate from './templates/newView'

const basePath = 'src/views'
const args = process.argv.splice(2)
let viewName = 'newView'
let viewPath = basePath
if (args.length > 0) [viewName] = args
if (args.length > 1) viewPath += args[1]
viewPath = `${viewPath}/${viewName}`

class ViewData {
	constructor(name, path) {
		this.name = name
		this.path = path
	}
	build() {
		if (this.path !== basePath) {
			mkdirp(this.path, (err) => {
				if (err) throw (err)
				this.mkfile()
			})
		}
	}

	mkfile() {
		const vuePath = `${this.path}/${this.name}.vue`
		fs.open(vuePath, 'w', (err, fd) => {
			if (err) throw err
			const { buffer } = new ViewTemplate(viewName)
			fs.write(fd, buffer, 0, buffer.length, 0, (err, written, buffer) => {})
		})
		const lessPath = `${this.path}/${this.name}.less`
		fs.open(lessPath, 'w', (err, fd) => {
			if (err) throw err
		})
	}
}

const view = new ViewData(viewName, viewPath)
view.build()

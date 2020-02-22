const fs = require('fs')
const logger = require('./logger')
const path = require('path')

module.exports = staticPath => {
    return (req, res, next) => {
        let _path = req.url

        if (_path === '/') _path += 'index.html'

        _path = path.join(staticPath, _path)

        const rs = fs.createReadStream(_path)

        let extension = path.extname(_path).substring(1)

        extension = extension === 'js' ? 'javascript' : extension

        res.setHeader('Content-Type', `text/${extension}`)

        rs.pipe(res)

        rs.on('error', error => {
            logger.warn(error)

            res.writeHead(404)

            return res.end(`<h1>Not found</h1>`)
        })

        res.on('error', error => logger.error(error))
    }
}
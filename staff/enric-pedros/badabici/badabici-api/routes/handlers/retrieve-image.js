const { retrieveImage } = require('../../logic')
const { NotAllowedError, ContentError } = require('badabici-errors')
const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
    const { params: { id } } = req
    debugger
    try {
        retrieveImage(id)
            .then(file => {
                debugger
                res.status(200)
                res.set('content-type', 'image/jpeg')
                res.set('accept-ranges', 'bytes')

                let readStream = fs.createReadStream(path.join(__dirname, `../../../badabici-data/pictures/${file}`)).pipe(res)

                readStream.on('close', () => {
                    res.end()
                })

            })
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 401 // not authorized

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}
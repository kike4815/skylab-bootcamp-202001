const express = require('express')
const fs = require('fs')
const { saveImage } = require('../../logic')
const Busboy = require('busboy')

module.exports = async (req, res) => {
    const { payload: { sub: userId }, params: { id:productId } } = req
    
    debugger
    const busboy = new Busboy({ headers: req.headers })
    
    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        filename = 'product01.jpg'
        
        await saveImage(userId, productId, file, filename)
        
    })

    busboy.on('finish', () => {
        res.end()
    })

    return req.pipe(busboy)

}
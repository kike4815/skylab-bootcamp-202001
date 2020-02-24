
const Item = require('./item')


module.exports=function({ results, error }) {
    return `<ul className="results">
        ${results? results.map(item=>Item({item})):''}
        ${error?`<p>${error}</p>`:''}
    </ul>`

}
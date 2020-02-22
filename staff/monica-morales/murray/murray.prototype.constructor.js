if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

function Murray() {
    if(arguments.length === 1 && typeof arguments[0] === 'number' && Number.isInteger(arguments[0])) {
        for(var i = 0; i < arguments[0]; i++) {
            this[i] = undefined
        }
        this.length = arguments[0]
    } else if(arguments.length === 1 && typeof arguments[0] === 'number' && !(Number.isInteger(arguments[0]))) {
        throw new RangeError('Invalid murray length')
    } else {
        for(var i = 0; i < arguments.length; i++){
            this[i] = arguments[i]
        }
        this.length = arguments.length
    }
    
}
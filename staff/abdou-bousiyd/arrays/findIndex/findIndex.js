
function findIndex(array, callback) {

    //validaciones
    if (!(array instanceof Array)) throw new TypeError(array + ' is not an Array');    
    if(!arguments.length) throw new TypeError(arguments + 'function must contain arguments')

    for(var i = 0; i < array.length; i++) {
        if (callback(array[i])) return i;
    }
    return -1
}
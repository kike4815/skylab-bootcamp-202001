function includes(array, element, position = 0) {

    //validaciones
    if (!(array instanceof Array)) throw new TypeError(array + ' is not an Array');    
    if(!arguments.length) throw new TypeError(arguments + 'function must contain arguments')
    if (!array.length) throw new TypeError(array + ' array cannot be empty'); 


    for(let i = position; i < array.length; i++) {
        if(array[i] === element) return true
    }
    return false
}
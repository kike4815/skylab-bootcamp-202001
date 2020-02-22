function forEach(array, callback) {

    if (!(array instanceof Array)) throw new TypeError(array + ' is not an Array');    
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    for (let i = 0; i < array[i]; i++) callback(array[i], i, array)
}
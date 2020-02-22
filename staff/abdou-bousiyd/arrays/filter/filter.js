

function filter(arr, callback) {
    var newArray = [];
    var j = 0;
    
    if (!arr.length) throw new TypeError ('the array passed as argument is empty')
    if (typeof callback !== 'function') throw new TypeError ('second element is not an function')
    if (!(arr instanceof Array)) throw new TypeError(arr + ' is not an Array');    
    
    
    for (var i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            return newArray[j] = arr[i]
            j ++
        }
    } return newArray
}


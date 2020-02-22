function push(arr, elem) {

        //validaciones
        if (!(arr instanceof Array)) throw new TypeError(arr + ' is not an Array');    

        arr[arr.length] = elem;
        return arr.length
    
}
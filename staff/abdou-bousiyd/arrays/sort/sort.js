function sort(arr) {
    if (!Array.isArray(arr)) throw Error('array is not valid');
    if (arr.length <= 0) throw Error('array is empty');

    var result = []
    var temp;

    for (var i = 0; i < arr.length; i++){
        result[i] = arr[i]
    }
    for(j = 0; j < arr.length; j++){
        for(i=0; i < arr.length; i++){
            if(arr[i] < arr[i-1]){
                temp = arr[i];
                arr[i] = arr[i-1];
                arr[i-1] = temp;      
            }
        }
    }
    return result;
    
    console.log(result, 88888)


}
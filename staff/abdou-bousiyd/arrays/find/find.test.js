console.log('test find');
console.log('should return first element of the array that performs the function');

var a = (function(){
    var a = [5, 12, 20, 44, 55, 67, 70];
    var callback = element => element === 20
    var returnValue = find(a, callback)
    
    var callback2 = element => element === undefined
    var returnValue2 = find(a, callback2)
    console.assert(returnValue === 20, 'should return position 44');
    
    console.log('should return undefined in case of error');
    console.assert(returnValue2 === undefined, 'should return undefined');
})()


var b = (function() {
    console.log('should fail when it\'s not an array')

    var error

    try {
        find();
    } catch (err) {
        error = err;
    }

    if(error) throw Error('should be failed')
    if (error.message !== 'undefined is not an array') throw Error('error message is not correct: ' + error.message);
})()


(function() {
    'use strict';

    console.log('test push');

    function assert(assertion, message) {
        if (!assertion) throw new Error('Assertion failed: ' + message);
    }


    console.log('should return length of the array');
    try {
        (function () {
            var a = [1, 2, 3, 4, 5, 6];
            var returnValue = push(a, 88)
            
            console.assert(returnValue === 7, 'should return value be 7');
            console.log('check last value');
            console.assert(a[a.length -1] === 88, 'should return value be 88');
        }())
    } catch (error) {
        console.error('should array [1, 2, 3] be modified adding 10 to each value', error);
    }

    console.log('should fail if the argument undefined');

    (function(){
        try{
            var _error;
            (function(){
                push()
            }())
        }catch(error){
            _error = error
            //console.log(_error)
        }

        if (_error.message !== 'undefined is not an Array') throw Error ('unexpected message')
        if (!_error) throw Error ('should be failed')
        console.log('%c Done %s', 'color: green', '✔');
    }())


    console.log('element is required');

    (function(){
        try{
            var arr = [1,2,3,4]
            var _error;
            (function(){
                push()
            }())
        }catch(error){
            _error = error
            //console.log(_error)
        }

        if (!_error) throw Error ('has not falid')
        if (_error.message !== 'undefined is not an Array') throw Error ('unexpected message')
        console.log('%c Done %s', 'color: green', '✔');
    }())
}())
console.log('test findIndex');


(function() {
    'use strict';

    console.log('should succeed on searching inside an array and returning the index of the element that satisfies the condition, if exists');

    function assert(assertion, message) {
        if (!assertion) throw new Error('Assertion failed: ' + message);
    }

    (function() {
        console.log('should return the correct position of element');
            (function () {
                var a = ['z', 'b', 'g', 'y'];
                var callback = element => element === 'b'
                var returnValue = findIndex(a, callback)

                console.assert(returnValue === 1, 'should return position 1');
            })();
        console.log('%c Done %s', 'color: green', '✔');
    }());

    (function() {
        console.log('should return -1 when element does not exist');
        (function () {
            var a = ['z', 'b', 'g', 'y'];
            var callback = element => element === 'f'
            var returnValue = findIndex(a, callback)

            console.assert(returnValue === -1, 'should return position -1');
        })();
    console.log('%c Done %s', 'color: green', '✔');
    }());

    (function() {
          console.log('should fail with non-array input (undefined)');
        try{
            var a
            var callback = function (num) { return num < 10; };
            var _error;
            (function () {
                findIndex(a, callback)
                console.assert(callback === undefined, 'should return array is undefained');
            })();
        }catch(error) {
            _error = error;
        }
        if (!_error) throw Error ('should be failed')
        if (_error.message === a + ' is not an array') throw Error('error message is not correct: ' + _error.message);
         console.log('%c Done %s', 'color: green', '✔');
    }());
}())
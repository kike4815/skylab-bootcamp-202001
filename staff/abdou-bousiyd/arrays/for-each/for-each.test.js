(function() {
    'use strict';

    console.log('TEST forEach');

    function assert(assertion, message) {
        if (!assertion) throw new Error('Assertion failed: ' + message);
    }

    try {
        console.log('should array [1, 2, 3] be modified adding 10 to each value');
        (function () {
            var array = [1, 2, 3];
            forEach(array, function (value, index) { array[index] = value + 10 });
            array.forEach(function (value, index) {
                assert(value === index + 1 + 10, 'should value at index ' + index + ' be ' + (index + 1 + 10));
            })
            console.log('%c Done %s', 'color: green', '✔');
        })();
    } catch (error) {
        console.error('should array [1, 2, 3] be modified adding 10 to each value', error);
    }


    try {
        (function () {
            console.log('should array [1, 2, 3] be modified adding 10 to each value');
            var array = [1, 2, 3];
            var a = [];
            forEach(array, function (value, index) { a[index] = value + 10 });
            a.forEach(function (a, index) {
                assert(a === array[index] + 10, 'should value at index ' + index + ' be ' + (array[index] + 10));
            })
            console.log('%c Done %s', 'color: green', '✔');
        })();
    } catch (error) {
        console.error('should array [1, 2, 3] be modified adding 10 to each value', error);
    }

    (function () {
        console.log('should fail on non-function expression');
        var _error;
        try {
            forEach([1, 2, 3]);
        } catch (error) {
            _error = error;
        } finally {
            console.assert(_error instanceof TypeError, 'should error be of type TypeError');
            console.assert(_error.message === 'undefined is not a function', 'should fail with message "undefined is not a function"');
        }
        console.log('%c Done %s', 'color: green', '✔');
    })();

    (function () {
        console.log('should fail on non-function argument');
        var _error;
        try {
            forEach(undefined, function(){ });
        } catch (error) {
            _error = error;
        } finally {
        console.assert(_error instanceof TypeError, 'should error be of type TypeError');
        console.assert(_error.message === 'undefined is not an Array', 'should fail with message "undefined is not a function"');
        }
        console.log('%c Done %s', 'color: green', '✔');

    })();

    
    (function () {
        console.log('debería la matriz debería fallar por el valor de la expresión');
        var _error;
        try {
            forEach(true, function(){ });
        } catch (error) {
            _error = error;
        } finally {
        console.assert(_error instanceof TypeError, 'should error be of type TypeError');
        console.assert(_error.message === 'true is not an Array', 'should fail with message "true is not a function"');
        }
        console.log('%c Done %s', 'color: green', '✔');
    })();
}())


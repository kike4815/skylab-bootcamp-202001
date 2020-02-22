(function() {
    'use strict';

    console.log('TEST includes');
    console.log('should succeed on returning true or false');

    function assert(assertion, message) {
        if (!assertion) throw new Error('Assertion failed: ' + message);
    }

    (function() {
        try {
            console.log('should return true when element exist');
            (function () {
                var a = [1, 2, 3, 4, 5, 6];
                var returnValue = includes(a, 2)
                console.assert(returnValue === true, 'should return true');
            })();
        } catch (error) {
            console.error('should array [1, 2, 3] be modified adding 10 to each value', error);
        }
        console.log('%c Done %s', 'color: green', '✔');
    }());
    
    (function() {
        console.log('should fail when array is empty');
        try {
            var a = [];
            var b = ''
            var _error
            (function () {
                includes(a, b)
            })();
        } catch (error) 
        {
            _error = error
        }
        if (!_error) throw Error ('should be failed')
        console.log('%c Done %s', 'color: green', '✔');
    }());
    
    (function() {
        console.log('should faild when no arguments');
        var _error;
        try {
            (function () {
                includes('lorem', 8)
            })();
        } catch (error) {
            _error = error
           // console.error( _error.message);
        }
        if (!_error) throw Error ('should be failed')
        console.log('%c Done %s', 'color: green', '✔');
    }())
}())
console.log('test isArray');


(function() {
    'use strict';

       function assert(assertion, message) {
        if (!assertion) throw new Error('Assertion failed: ' + message);
    }

    (function() {
        console.log('Should return true if is an array');

        let result = isArray([])
        if (result !== true) throw Error('unexpected value should return a true')
        console.log('%c Done %s', 'color: green', '✔');
    }());

    (function() {
        console.log('Should return false if is an array');

        let result = isArray()
        if (result !== false) throw Error('unexpected value should return a false')
        console.log('%c Done %s', 'color: green', '✔');
    }());
}())
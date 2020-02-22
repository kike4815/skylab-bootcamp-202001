(function() {
    'use strict';

    console.log('TEST concat');
    console.log('debe retornar los 2 el arrays completos');

    function assert(assertion, message) {
        if (!assertion) throw new Error('Assertion failed: ' + message);
    }

    (function() {
        try {
            console.log('should return two matrices in a new one');
            (function () {
                var a = [1, 2, 3, 4, 5];
                var b = [6, 7, 8, 9, 0];
                var res = concat(a, b)
                console.assert(res === a, b);
            })();
        } catch (error) {
            console.error('should array [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] be modified', error);
        }
        console.log('%c Done %s', 'color: green', '✔');
    }());
    
}())
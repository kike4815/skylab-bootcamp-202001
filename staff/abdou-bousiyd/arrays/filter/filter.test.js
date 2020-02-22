console.log('test filter');


(function() {
    'use strict';


    function assert(assertion, message) {
        if (!assertion) throw new Error('Assertion failed: ' + message);
    }
    //---------------

    (function() {
        console.log('It should fail on non-function second parameter');

    }())

}())
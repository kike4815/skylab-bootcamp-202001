console.log('test sort');


(function() {
    'use strict';

       function assert(assertion, message) {
        if (!assertion) throw new Error('Assertion failed: ' + message);
    }

    (function() {

        console.log('should fail on non-array');

            var _error;

            try {
                sort();
            } catch (error) {
                _error = error;
            }
            if (!_error) throw Error('has not failed');

            if (_error.message !== 'array is not valid') throw Error('error message is not correct');
                console.log('%c Done %s', 'color: green', '✔');
            }());

    (function() {
        console.log('should fail on emty array');

            var arr = [];
            var _error;

            try {
                sort(arr);
            } catch (error) {
                _error = error;
            }
            if (!_error) throw Error('has not failed');

            if (_error.message !== 'array is empty') throw Error('error message is not correct');
                console.log('%c Done %s', 'color: green', '✔')
    }());
}())
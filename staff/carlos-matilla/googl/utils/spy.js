'use strict';

function spy(func, ctx) {
    return function() {
        console.log(func.name +  '(' + (function() {
            var args = '';

            for (var i = 0; i < arguments.length; i++) {
                args += arguments[i];
                
                if(i < arguments.length -1) args += ', ';
            }

            return args;
        }).apply(ctx, arguments) + ') {');

        var ret = func.apply(ctx, arguments);

        console.log('} ' + func.name + ' => ' + ret);
        
        return ret;
    }
}
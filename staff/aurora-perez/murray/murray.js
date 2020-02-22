'use strict';

function Murray() {
    var _arguments = arguments;

    var initializeWithLength = (function () {
        if (_arguments.length === 1 && typeof _arguments[0] === 'number')
            if (Number.isInteger(_arguments[0]) && _arguments[0]>0)
                return true;
            else throw new RangeError('Invalid murray length')

        return false;
    })();

    if (initializeWithLength) {
        this.length = _arguments[0];
        for (var i = 0; i < this.length; i++ ) {
            this[i] = undefined
        } 
    } else {
        this.length = _arguments.length;
         for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
    }
}

Murray.prototype.push = function (value) {
    if (arguments.length===0) { 
        return this.length
    } else {
        for (var i = this.length; i < this.length + arguments.length ; i++){
            this[i]= arguments[i-this.length]
        }
        return this.length = this.length + arguments.length;
    }
};

Murray.prototype.forEach = function (expression) {
    if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++) expression(this[i], i, this);
};

Murray.prototype.pop= function() {
    if (this.length === 0) {
        this[0] = undefined;
        return this[0];

    } else {
        var result = this[this.length-1];
        delete this[this.length-1];
        this.length = this.length-1
        return result
    };
}

Murray.prototype.toString=function() {    
    var str = '';
    for (var i = 0; i < this.length; i++) {
        if (this[i] === undefined) { 
            i === this.length-1 ? str += '' : str += ',';
        } else {i === this.length-1 ? str += `${this[i]}` : str += `${this[i]},`}
    }
    return str;
};


Murray.prototype.indexOf = function(value, position) {
    if (position && typeof position === 'boolean') {position = 1};
    
    if (isNaN(parseInt(position))) {position = 0};

    if (position < 0){position = this.length + position};

    if (position===undefined){position = 0};

    for (position = parseInt(position); position < this.length; position++) {
        if (value === this[position]) {
            var result = position;
            return result;
        };
    };
    return -1;
};

Murray.prototype.reverse = function reverse() {
    var newMurray = [];
    for (var i = 0; i < this.length; i++) {
        newMurray[newMurray.length] = this[this.length - i - 1];
    }
    for( var i = 0; i <this.length; i++){
        this[i] = newMurray[i];
    }
    return this;
};

Murray.prototype.map = function (expression) { 
    if(typeof expression !== "function"){ throw new TypeError (expression +' is not a function')};
    
    var result = new Murray;
    for (var i = 0; i < this.length; i++) {
        result[i] = expression(this[i]);
        result.length++
    }

    return result;
}

Murray.prototype.join = function (separator) {
    var newString = '';
    for (var i = 0; i < this.length; i++){
        i == this.length -1 ? newString += `${this[i]}` : newString += `${this[i]}`+ `${separator}`
    };
    return newString;
};

Murray.prototype.find = function ( expression) {
    if (typeof expression !== 'function') {throw new TypeError (expression + ' is not a function.')};

    var result;
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) {
            return result = this[i]; 
            
        } else {
            result = undefined;
        };
    };
    return result;
};

Murray.prototype.findIndex = function findIndex (expression) { debugger
    if (typeof expression !== 'function') {throw new TypeError(expression + ' is not a function.')};
    
    var result = -1;
    for (var i = 0; i < this.length; i++){
        if (expression(this[i])){
            result = i;
            i = this.length;
        };
    };
    return result;
}

Murray.prototype.shift = function shift (){
   var result = [];
    if (this.length==0){
        return undefined;
    }else{
        result = this [0]
        for (var i =0; i< this.length; i++){  
            this [i] = this[i+1];
        };
        this.length=this.length-1;
    };
    return result;
};

Murray.prototype.filter = function filter(condition) {
    if (typeof condition !== 'function') throw new TypeError(condition + ' is not a function.');
    
    var filtered = new Murray;
    for (var i = 0; i < this.length; i++) {
        if (condition(this[i])) {
            filtered[filtered.length] = this[i];
            filtered.length++
        }
    }
    return filtered;
}

Murray.prototype.every = function every (expression) {
    if (typeof expression !== 'function') {throw new TypeError (expression + ' is not a function.')};

    for (var i = 0; i < this.length; i++){ if (!expression(this[i])) return false};

    return true;
};

Murray.of = function of() {
    var murray = new Murray;
    for (var i = 0; i < arguments.length; i++) {
        murray[murray.length] = arguments[i];
        murray.length ++
    };

    return murray;
};

Murray.prototype.includes = function (value, position) {
    if (position && typeof position === 'boolean') {position = 1 };
    if (isNaN(parseInt(position))) { position = 0 };
    if (position < 0) { position = this.length + position };

    position = parseInt(position);

    for (parseInt(position); position < this.length; position++) {
        if (this[position] === value) { return true };
    }
    return false;
};

Murray.prototype.concat = function () {
    var concatenated = new Murray;

    for (var i = 0; i < this.length; i++) { concatenated[i] = this[i]; concatenated.length++ };
    for (var i = 0; i < arguments.length; i++) {
        var args = arguments[i];
        if (args instanceof Array || args instanceof Murray) {
            for (var j = 0; j < args.length; j++) {
                concatenated[concatenated.length] = args[j];
                concatenated.length++;
            }
        } else { concatenated[concatenated.length] = args; concatenated.length++ };
    }
    return concatenated;
};

Murray.prototype.fill = function (value, start, end) {
    if (isNaN(parseInt(start))) { start = 0 };
    if (start && typeof start === 'boolean') { start = 1 };
    if (start<0) { start = this.length + start };

    if (isNaN(parseInt(end))) { end = this.length };
    if (end && typeof end === 'boolean') { end = 1 };
    if (end < 0) { end = this.length + end };

    start = parseInt(start);
    end = parseInt(end);

    for (start; start < end; start++) { this[start] = value };
    return this;
};

if (typeof module !== 'undefined') 
    module.exports = Murray
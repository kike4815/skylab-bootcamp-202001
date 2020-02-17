'use strict';

function Murray() {
    var _arguments = arguments;

    var initializeWithLength = (function () {
        if (_arguments.length === 1 && typeof _arguments[0] === 'number')
            if (Number.isInteger(_arguments[0]))
                return true;
            else throw new RangeError('Invalid murray length')

        return false;
    })();

    this.length = initializeWithLength ? arguments[0] : arguments.length;

    if (!initializeWithLength)
        for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
}

Murray.prototype.push = function (value) {
    this[this.length] = value;

    return ++this.length;
};

Murray.prototype.forEach = function (expression) {
    if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++) expression(this[i], i, this);
};

Murray.prototype.pop = function () {
    if (!(this instanceof Murray)) throw new TypeError(this + ' is not Murray');

    var lastPosition;
    if (this.length === 0) return undefined
    else lastPosition = this[this.length - 1];
    delete this[this.length - 1]
    this.length = this.length - 1
    return lastPosition
};

Murray.prototype.concat = function () {

    var result = new Murray();
    for (var i = 0; i < this.length; i++) {
        result[i] = this[i];
        ++result.length;
    }
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            result[result.length] = arguments[i][j];
            ++result.length;
        }
    }
    return result;
};

Murray.prototype.shift = function () {
    var result = this[0];
    for (var i = 1; i < this.length; i++) {
        this[i - 1] = this[i]
    }
    this.length = this.length - 1
    delete this[this.length]
    return (result)
}

Murray.prototype.unshift = function () {
    if (arguments.length === 0) return this.length
    else {
        this.length = this.length + arguments.length
        for (var i = this.length - 1 - arguments.length; i >= 0; i--) {
            this[i + arguments.length] = this[i]
        }
        for (var j = 0; j < arguments.length; j++) {
            this[j] = arguments[j]
        }
        return this.length
    }
}

Murray.prototype.every = function (callback) {
    if (!(callback instanceof Function)) throw new TypeError(callback + ' is not a function')

    for (var i = 0; i < this.length; i++) {
        if (!callback(this[i])) {
            return false
        }
    } return true
}

Murray.prototype.filter = function (callback) {
    if (!(callback instanceof Function)) throw new TypeError(callback + ' is not a function')

    var newarray = []
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            newarray[newarray.length] = this[i]
        }
    }
    return newarray
}

Murray.prototype.slice = function (startIndex = 0, stopIndex = 0) {
    if (!(typeof startIndex === 'number')) throw new TypeError(startIndex + ' arguments is not a number')
    if (!(typeof stopIndex === 'number')) throw new TypeError(stopIndex + ' arguments is not a number')

    var newArray = []

    if (startIndex <= 0) {
        startIndex += this.length
    }
    if (stopIndex <= 0) {
        stopIndex += this.length
    }
    for (var i = startIndex; i < stopIndex; i++) {
        newArray[newArray.length] = this[i]
    }
    return newArray
}

Murray.prototype.indexOf = function (element, value=0) {

    if (value > this.length) return -1

    if (value < 0) {
        for (var i = this.length + value; i >= 0; i--) {
            if (this[i] === element) {
                return i
            }
        }return -1
    }

    else {

        for (var i = 0; i < this.length; i++) {
            if (this[i] === element) {
                return i
            }
        } return -1
    }
}

if (typeof module !== 'undefined'){

    module.exports = Murray
}


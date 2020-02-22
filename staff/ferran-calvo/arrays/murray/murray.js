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

Murray.prototype.filter = function(callback){
    if (typeof callback !== 'function')throw new TypeError(callback + ' is not a function');
    var newMurray = [];
    for(var i=0; i<this.length; i++){
        if(callback(this[i])){
            newMurray[newMurray.length]=this[i];
        }
    }
    return newMurray
}

Murray.prototype.slice = function(indexStart = 0, indexEnd = 0){
    if (!(typeof indexStart === 'number'))throw new TypeError (indexStart +' arguments is not a number')
    if (!(typeof indexEnd === 'number'))throw new TypeError (indexEnd + ' arguments is not a number')
    var newMurray = [];
    if (indexStart <=0){
        indexStart += this.length;
    }
    if (indexEnd <=0){
        indexEnd += this.length;
    }
    for (var i=indexStart; i<indexEnd; i++){
        newMurray[newMurray.length] = this[i];
    }
    return newMurray
}

Murray.prototype.unshift = function(){
    this.length += arguments.length;
    for(var i=this.length-1-arguments.length; i>=0; i--){
        this[i+arguments.length] = this[i];
    }
    for (var j=0; j<arguments.length; j++){
        this[j] =  arguments[j];
    }
    return this.length
}

Murray.prototype.every = function(callback){
    if (typeof callback !== 'function')throw new TypeError(callback + ' is not a function');
    for (var i=0; i<this.length; i++){
        if (callback(this[i]) === false){
            return false;
        }
    }
    return true
}

Murray.prototype.reverse = function(){
    var newArray = [];
    for (var j=0; j<this.length; j++){
        newArray[j] = this[j];
    }
    for (var i=0; i<this.length; i++){
        this[i] = newArray[newArray.length -1 - i];
    }
    return this;
}

Murray.prototype.pop = function(){
    var popElement;
    popElement = this[this.length-1];
    this.length=this.length-1;
    return popElement
}

Murray.prototype.shift = function(){
    var shiftedElement = this[0];
    for (var i=0; i<this.length; i++){
        this[i] = this[i+1];
    }
    this.length = this.length-1;
    return shiftedElement
}

Murray.prototype.concat = function(){
    var newMurray = this;
    for(var i = 0; i<arguments.length; i++){
        for(var j = 0; j<arguments[i].length; j++){
            newMurray[newMurray.length] = arguments[i][j];
            newMurray.length += 1;
        }
    }
    return newMurray;
}

Murray.prototype.findIndex = function(callback) {
    if (typeof callback !== 'function')throw new TypeError(callback + ' is not a function');
    for(var i = 0; i < this.length; i++) {
        if(callback(this[i])) {
            return i
        }
    }
    return -1
}

Murray.prototype.lastIndexOf = function(element){
    for (var i=this.length-1;i>=0; i--){
        if (element == this[i]){
            return i;
        }
    }
    return -1;
}

Murray.prototype.includes = function(value, indexFrom = 0){
    if (!(typeof indexFrom === 'number'))throw new TypeError (indexFrom +' is not a number')
    if (indexFrom < 0){
        indexFrom = this.length + indexFrom;
        if (indexFrom < 0){
            indexFrom = 0;
        }
    }
    for (var i=indexFrom; i<this.length; i++){
        if (this[i] === value){
            return true;
        }
    }
    return false;
}

Murray.prototype.join = function(element = ","){
    if (!(typeof element === 'string')) throw new TypeError(element + " should be a string");
    var result = "";
    for (var i=0; i<this.length; i++){
        if(i===this.length-1){
            result += this[i];
        }
        else{
            result += this[i] + element; 
        }
    }
    return result
}

Murray.prototype.fill= function(value, start = 0, end = this.length){
    if (!(typeof start === 'number'))throw new TypeError (start +' is not a number')
    if (!(typeof end === 'number'))throw new TypeError (end + ' is not a number')
    if (start < 0){
        start += this.length;
    }
    if (end < 0){
        end += this.length;
    }
    var nElements=end-start;
    for (var i=0; i<nElements; i++){
        this[start+i] = value;
    }
    return this;
}

if (typeof module !== 'undefined'){
    module.exports = Murray
}
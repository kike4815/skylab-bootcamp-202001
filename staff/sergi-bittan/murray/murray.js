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
    if (this.length === 0)
    {
        return undefined;
    }
    var result = this[this.length -1];
    delete this[this.length - 1];//tengo que borrar la propiedad del objeto porque length no la borra.
    this.length = this.length - 1;
    return result;
};
Murray.prototype.map = function(callback){
    if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
    var newMurray = new Murray();
    for (var i = 0; i<this.length;i++)
    {
        newMurray
        .push(callback(this[i]));
    }
    return newMurray;
};
Murray.prototype.every = function(callback){
    if(typeof callback !== "function") throw new TypeError(callback + " is not a function");
    var bool = true;
    for (var i = 0; i<this.length;i++)
    {
        if (!callback(this[i]))
        {
            bool = false;
            break;
        }
    }
    return bool;
};
Murray.prototype.reverse = function(){
    var newMurray = new Murray;
    for (var i = this.length-1; i>=0; i--)
    {
        newMurray.push(this[i]);
    }
    for (var i = 0; i< newMurray.length; i++)
    {
        this[i] = newMurray[i];
    }
    return this;
};
Murray.prototype.filter = function(callback) 
{
    if(typeof callback !== "function") throw new TypeError(callback + " is not a function");
    var newMurray = new Murray;
    for (var i = 0; i<this.length; i++)
    {
        if (callback(this[i]))
        {
            newMurray.push(this[i]);
        }
    }
    return newMurray;
};
Murray.prototype.slice = function(startIndex, endIndex)
{
    var newMurray = new Murray;
    if (startIndex < 0 && endIndex < 0){
        if (startIndex === endIndex || startIndex > endIndex){
            newMurray = new Murray;
            return;
        }
    
        startIndex = -1 * (startIndex);
        endIndex = -1 * (endIndex);
        for (var i = this.length - startIndex; i < this.length - endIndex; i++)
        {
            newMurray.push(this[i]);
        }
        return newMurray;
    }
    if(endIndex < 0)
    {
        i = startIndex;
        endIndex = -1 * (endIndex);
        this.length = (this.length - 1) - endIndex;
        for (var i = startIndex; i <= this.length; i++)
        {
            newMurray.push(this[i]);
        }
        return newMurray;
    }
    
    if (startIndex < 0)
    {   
        startIndex = -1*(startIndex);
        startIndex = this.length - startIndex;
        for (var i = startIndex; i < this.length; i++)
        {
            newMurray.push(this[i]);
        }
        return newMurray;
    }
    
    var endIndex = endIndex || this.length;
    for (var i = startIndex || 0; i< endIndex; i++)
    {
        newMurray.push(this[i]);
    }
    return newMurray;
        
};
Murray.prototype.shift = function(){
    var firstPosition = this[0];
    if (this.length === 0){
        return undefined;
    }
    for (var i = 0; i < this.length; i++)
    {
        this[i] = this[i+1];
    }
    this.pop();
    

    //this.length = this.length - 1;//debo modificar la longitud de murray;
    return firstPosition;
};
Murray.prototype.findIndex = function(callback){
    if(typeof callback !== "function") throw new TypeError(callback + " is not a function");
    var index = 0;
    for (var i = 0;i<this.length;i++)
    {
        if (callback(this[i]))
        {
            index = i;
            return index;
        }
    }
    index = -1;
    return index;
}
Murray.prototype.concat = function(){
    
    var newMurray = new Murray
    for (let i = 0; i < this.length; i++) {
        newMurray.push(this[i])
    }
    for (let i = 0; i < arguments.length; i++) {
        if(arguments[i] instanceof Murray) {
        for (let j = 0; j < arguments[i].length; j++) {
            newMurray.push(arguments[i][j])
        }
        } else {
        newMurray.push(arguments[i])
        }
    }
    return newMurray
}

if (typeof module !== "undefined")
    module.exports = Murray



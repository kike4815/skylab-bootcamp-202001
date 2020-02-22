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

Murray.prototype.pop = function (){
    var lastPosition = this[this.length-1];
    delete this[this.length-1]
    this.length = this.length-1;
    return lastPosition;
};

Murray.prototype.concat = function (){
    var result = new Murray ();
    for(var i=0; i<this.length; i++){
        result[i]=this[i];
        ++result.length;
    }
    for(var i =0; i<arguments.length; i++){
        for(var j = 0 ; j < arguments[i].length;j++){
            result[result.length]=arguments[i][j];
            ++result.length;  
        }        
    }
    return result;   
};

Murray.prototype.map = function (expression){
    if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');
    if(expression===undefined) throw new TypeError ('It is necessary an expression');
    
    var newMurray = new Murray();
    for(var i = 0; i<this.length; i++){
        newMurray[i] = expression(this[i]);
        ++newMurray.length;
    }
    return newMurray;
};

Murray.prototype.includes = function (value){
    for(var i = 0; i<this.length; i++){
        if(value === this[i]){
            return true;
        }
    }
    return false;
};

Murray.prototype.from = function (value){
    var newMurray = new Murray();
    for(var i=0; i<value.length; i++){
        newMurray[i] = value[i];
        ++newMurray.length
    }
    return newMurray;
};

Murray.prototype.shift = function (){
    var firstIndex = this[0];
    for(var i = 0; i<this.length; i++){
        this[i] = this[i+1]
    };
    if(this.length > 0){
        delete this[this.length-1]
        --this.length;
        return firstIndex;
    }else{
        return undefined;
    };
};

Murray.prototype.filter = function(expression){
    if(expression === undefined) throw new TypeError ('It is necessary an expression');
    if (!(this instanceof Murray)) throw new TypeError(this + ' is not a Murray');
   
    var newMurray = new Murray();
    for(var i =0; i<this.length; i++){
        if(expression(this[i])){
            newMurray[newMurray.length] = this[i];
            ++newMurray.length;
        };
    };
    return newMurray;
};

Murray.prototype.find = function(expression){
    if(expression === undefined) throw new TypeError ('It is necessary an expression');
    if (!(this instanceof Murray)) throw new TypeError(this + ' is not a Murray');
    for(var i =0; i<this.length; i++){
        if(expression(this[i])){
            return this[i];
        };
    };
    return undefined;
};

Murray.prototype.reverse = function(){
    var container = new Murray();
    var conta = 0;
    for(var i = this.length-1; i >= 0; i--){
        container[conta] = this[i];
        conta++;  
        ++container.length;      
    };
    for(var i = 0; i < container.length; i++){
        this[i] = container[i];
    }
    return this;
};

Murray.prototype.slice = function(start, end){
    var newMurray = new Murray();
    for(var i = start; i < end; i++){
        newMurray[newMurray.length] = this[i];
        ++newMurray.length;
    };
    return newMurray;
};

Murray.prototype.every = function(expression){
    if(expression === undefined) throw new TypeError ('It is necessary an expression');
    if (!(this instanceof Murray)) throw new TypeError(this + ' is not a Murray');
    var result = true;
    for (var i=0; i<this.length; i++){
        if(!expression(this[i])){
            result = false;
            break;
        };
    };
    return result;
};

Murray.prototype.indexOf = function(value, start){
    if (!(this instanceof Murray)) throw new TypeError(this + '.indexOf is not a function');

    if(start === undefined){start = 0};
    if(start < 0){start += this.length};
    for(var i = start; i < this.length; i++){
        if(this[i] === value){
            return i;
        }
    };
    return -1    
};

if(typeof module !== 'undefined'){
    module.exports = Murray
}

if (typeof Function.prototype.extend === 'undefined')
    Function.prototype.extend = function (parent) {
        this.prototype = Object.create(parent.prototype)
        this.prototype.constructor = this
    }
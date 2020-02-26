if (typeof Array.prototype.toggle === 'undefined')
    Array.prototype.toggle = function (value) {
        const index = this.findIndex(_value => _value === value)

        if (index > -1) this.splice(index, 1)
        else this.push(value)
    }
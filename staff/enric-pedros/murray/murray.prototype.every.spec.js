if (typeof require !== 'undefined'){

    var Murray = require('./murray')
}

describe('Murray.prototype.every', function () {
    it('it should be return a true or false if the condition of all elements met the condition', function () {
        var a = new Murray(1, 2, 3, 4)
        var f = function (element) { return element < 5 }
        var result = a.every(f)
        expect(result).toBe(true)

    })
    it('it should fail due to the argument is not a Function', function () {

        expect(function () {
            new Murray(1, 2, 3).every('ab');
        }).toThrowError(TypeError, 'ab is not a function')
    });

    it('it should be return a true boolean due to the Murray is empty', function () {
        var a = new Murray()
        var f = function (element) { return element < 5 }
        var result = a.every(f)
        expect(result).toBe(true)

    })
    it('it should be return false boolean because not all the elements complain the function', function () {
        var a = new Murray(1, 2, 3, 4)
        var f = function (element) { return element < 1 }
        var result = a.every(f)
        expect(result).toBe(false)


    })

})

if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.filter', function () {
    
    it('Returns a new murray with all numbers within the existing murray that are > than 18', function () {
        
        var murray = new Murray(10, 13, 56, 34, 57, 22);
        
        var result = murray.filter(function(value) {
            return value > 18
        });
        expect(result.length).toBe(4);
    });

    it('Verifies all the words with the letter \'o\' that exists within murray', function () {
        var murray = new Murray('abc', 'hola', 'mundo', 'hello', 'world');

        var result = murray.filter(function (value) {
            return value.indexOf('o') > -1;
        });

        expect(result.length).toBe(4);
        expect(result[0]).toBe('hola');
        expect(result[1]).toBe('mundo');
        expect(result[2]).toBe('hello');
        expect(result[3]).toBe('world');
    });

    it('should fail on non-function expression', function () {
        expect(function () {
            new Murray(1, 2, 3).filter();
        }).toThrowError(TypeError, 'undefined is not a function');
        
        expect(function () {
            new Murray(1, 2, 3).filter(true);
        }).toThrowError(TypeError, 'true is not a function');

        expect(function () {
            new Murray(1, 2, 3).filter(1);
        }).toThrowError(TypeError, '1 is not a function');

        expect(function () {
            new Murray(1, 2, 3).filter(null);
        }).toThrowError(TypeError, 'null is not a function');
    })
});
if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.prototype.map', function() {
    it('should return a new murray with all values changed according to the callback specifications', function() {
        var murray = new Murray(1,2,3,4,5);
        var mapped = murray.map(function(value) { return value *= 10 });

        expect(mapped.length).toBe(5);
        expect(mapped[0]).toBe(10);
        expect(mapped[mapped.length-1]).toBe(50);

        var _murray = new Murray('A','B','C','D','E');
        var _mapped = _murray.map(function(value) { return value += value });

        expect(_mapped.length).toBe(5);
        expect(_mapped[0]).toBe('AA');
        expect(_mapped[_mapped.length-1]).toBe('EE');
    });

    it('should not modify the original murray after the mapping', function() {
        var murray = new Murray(1,2,3,4,5);
        var mapped = murray.map(function(value) { return value *= 10 });

        murray.forEach(function(value, index) { expect(value).not.toBe(mapped[index])});
    });

    it('should throw a TypeError when the argument provided is not a callback function', function () {
        expect(function () {new Murray(1, 2, 3).map();}).toThrowError(TypeError, 'undefined is not a function');
        
        expect(function () {
            new Murray(1, 2, 3).map('oso');
        }).toThrowError(TypeError, 'oso is not a function');

        expect(function () {
            new Murray(1, 2, 3).map(-1);
        }).toThrowError(TypeError, '-1 is not a function');

        expect(function () {
            new Murray(1, 2, 3).map({});
        }).toThrowError(TypeError, '[object Object] is not a function');
    });

    it('should map the murray even when a second argument has been accidentally placed, assuming that the callback is properly set', function(){
        var murray = new Murray(1,2,3,4,5);
        var mapped = murray.map(function(value) { return value *= 10 }, 'oso');

        expect(mapped.length).toBe(5);
        expect(mapped[0]).toBe(10);
        expect(mapped[mapped.length-1]).toBe(50);

        var _murray = new Murray('A','B','C','D','E');
        var _mapped = _murray.map(function(value) { return value += value }, function(value) { return value += value });

        expect(_mapped.length).toBe(5);
        expect(_mapped[0]).toBe('AA');
        expect(_mapped[_mapped.length-1]).toBe('EE');
    });
})
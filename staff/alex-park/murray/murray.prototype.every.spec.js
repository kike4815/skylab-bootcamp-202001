if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.prototype.every', function() {
    it('should return a boolean value of true if all elements of a murray meet the callback criteria', function () {
        var murray = new Murray(50,100,200);
        var allGood = murray.every(function(value) { return value > 25 });

        expect(allGood).toBe(true);
        expect(typeof allGood === 'boolean').toBe(true);
    });

    it('should return a boolean value of false when at least one element of the murray do not meet the callback criteria', function () {
        var murray = new Murray(50,100,200);
        var allGood = murray.every(function(value) { return value > 50 });

        expect(allGood).toBe(false);
        expect(typeof allGood === 'boolean').toBe(true);
    });

    it('should not modify the original murray', function () {
        var murray = new Murray(1,2,3,4,5);
        var copy = new Murray(1,2,3,4,5);
        murray.every(function(value) { return value > 2 });

        murray.forEach(function(value, index) { expect(value).toBe(copy[index]) });
    });

    it('should throw a TypeError when the first argument is not a callback function', function () {
        expect(function () {
            new Murray(1,2,3,4,5).every();
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function () {
            new Murray(1,2,3,4,5).every(-5);
        }).toThrowError(TypeError, '-5 is not a function');

        expect(function () {
            new Murray(1,2,3,4,5).every('oso');
        }).toThrowError(TypeError, 'oso is not a function');

        expect(function () {
            new Murray(1,2,3,4,5).every({});
        }).toThrowError(TypeError, '[object Object] is not a function');

        expect(function () {
            new Murray(1,2,3,4,5).every(false);
        }).toThrowError(TypeError, 'false is not a function');
    });

    it('should work even when more argument(s) have been accidentally placed after the callback', function () {
        var murray = new Murray(20,50,100);
        var allGood = murray.every(function(value) { return value > 10 }, 'oso');

        expect(allGood).toBe(true);
        expect(typeof allGood === 'boolean').toBe(true);

        var _murray = new Murray(20,50,100);
        var _allGood = _murray.every(function(value) { return value < 10 }, function(value) { return value > 10 });

        expect(_allGood).not.toBe(true);
        expect(typeof _allGood === 'boolean').toBe(true);
    });
})
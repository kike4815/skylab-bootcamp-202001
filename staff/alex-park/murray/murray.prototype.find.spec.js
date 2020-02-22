if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.prototype.find', function() {
    it('should return the first element of the murray that meets the callback criteria', function () {
        var murray = new Murray(10,20,30,40,50);
        var found = murray.find(function(value){return value > 40});

        expect(found).toBe(50);

        var _murray = new Murray('a','b','c','d','e');
        var _found = _murray.find(function(value) { return value > 'c' });

        expect(typeof _found === 'string').toBe(true);
        expect(_found).toBe('d');
    });

    it('should return undefined when no element from the murray meets the callback criteria', function() {
        var murray = new Murray(1,2,3,4,5);
        var found = murray.find(function(value) { return value > 10 });

        expect(found).toBeUndefined();

        var _murray = new Murray('a','b','c','d','e');
        var _found = _murray.find(function(value) { return value > 'f' });

        expect(typeof _found === 'string').toBe(false);
        expect(_found).toBeUndefined();
    });

    it('should fail with a TypeError when no callback function was set as a first argument', function() {
        expect(function() {
            new Murray(1,2,3).find(-1);
        }).toThrowError(TypeError, '-1 is not a function');

        expect(function() {
            new Murray(1,2,3).find('oso');
        }).toThrowError(TypeError, 'oso is not a function');

        expect(function() {
            new Murray(1,2,3).find(false);
        }).toThrowError(TypeError, 'false is not a function');

        expect(function() {
            new Murray(1,2,3).find({});
        }).toThrowError(TypeError, '[object Object] is not a function');

        expect(function() {
            new Murray(1,2,3).find();
        }).toThrowError(TypeError, 'undefined is not a function');
    });

    it('should work even if a second argument has been accidentally set, regardless of its data type', function () {
        var murray = new Murray(1,2,3,4,5);
        var found = murray.find(function(value) { return value >= 3 }, 'caca');

        expect(found).toBe(3);

        var _murray = new Murray('a','b','c','d','e');
        var _found = _murray.find(function(value) { return value > 'f' }, function(value) { return value > 'a' });

        expect(typeof _found === 'string').toBe(false);
        expect(_found).toBeUndefined();
    });

    it('should not modify the original murray', function() {
        var murray = new Murray(1,2,3,4,5);
        var copy = new Murray(1,2,3,4,5);
        murray.find(function(value) { return value >= 3 });

        murray.forEach(function(value, index) { expect(value).toBe(copy[index]) });
    });
})
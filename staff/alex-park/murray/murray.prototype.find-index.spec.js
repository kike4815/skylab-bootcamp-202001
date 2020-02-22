if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.prototype.findIndex', function() {
    it('should return the index of the first element of a murray that meets the callback criteria', function() {
        var murray = new Murray(1,2,3,4,5);
        var indexed = murray.findIndex(function(value) { return value > 4 });

        expect(indexed).toBe(4);

        var _murray = new Murray(1,2,3,4,5);
        var _indexed = _murray.findIndex(function(value) { return value >= 4 });

        expect(_indexed).toBe(3);
    });

    it('should return -1 if no element from the murray meets the callback criteria', function() {
        var murray = new Murray(1,2,3,4,5);
        var indexed = murray.findIndex(function(value) { return value > 10 });

        expect(indexed).toBe(-1);

        var _murray = new Murray('a','b','c','d');
        var _indexed = _murray.findIndex(function(value) { return value >= 'e' });

        expect(_indexed).toBe(-1);
    });

    it('should fail with a TypeError if no callback function was set as a first argument', function() {
        expect(function() {
            new Murray(1,2,3).findIndex();
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function() {
            new Murray(1,2,3).findIndex(-1);
        }).toThrowError(TypeError, '-1 is not a function');

        expect(function() {
            new Murray(1,2,3).findIndex('oso');
        }).toThrowError(TypeError, 'oso is not a function');

        expect(function() {
            new Murray(1,2,3).findIndex(false);
        }).toThrowError(TypeError, 'false is not a function');

        expect(function() {
            new Murray(1,2,3).findIndex({});
        }).toThrowError(TypeError, '[object Object] is not a function');
    });

    it('should work even if a second argument has been accidentally set after the callback criteria', function() {
        var murray = new Murray(1,2,3,4,5);
        var indexed = murray.findIndex(function(value) { return value >=2 }, 'oso');

        expect(indexed).toBe(1);

        var _murray = new Murray(1,2,3,4,5);
        var _indexed = _murray.findIndex(function(value) { return value >=2 }, 50);

        expect(_indexed).toBe(1);

        var murray_ = new Murray(1,2,3,4,5);
        var indexed_ = murray_.findIndex(function(value) { return value >=2 }, function(value) { return value >=1 });

        expect(indexed_).toBe(1);
    });

    it('should not modify the original murray', function() {
        var murray = new Murray(1,2,3,4,5);
        var copy = new Murray(1,2,3,4,5);
        murray.findIndex(function(value) { return value === 3 });

        murray.forEach(function(value, index) { expect(value).toBe(copy[index]) });
    });
})
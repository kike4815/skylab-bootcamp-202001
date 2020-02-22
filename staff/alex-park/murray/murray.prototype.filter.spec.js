if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.prototype.filter', function() {
    it('should return a new murray with all elements from the original one that meet the callback criteria', function() {
        var murray = new Murray(10,20,30,40,50);
        var filtered = murray.filter(function(value) { return value > 30 });

        expect(filtered.length).toBe(2);
        expect(filtered instanceof Murray).toBe(true);
        expect(filtered[0]).toBe(40);
    });

    it('should not modify the original murray', function() {
        var murray = new Murray(1,2,3,4,5);
        var copy = new Murray(1,2,3,4,5);
        murray.filter(function(value) { return value > 2 });

        murray.forEach(function(value, index) { expect(value).toBe(copy[index]) });
    });

    it('should not fail when you try to filter an empty murray. In that case, both original and filtered murrays will be empty', function () {
        var murray = new Murray();
        var filtered = murray.filter(function(value) { return value > 1 });

        expect(filtered.length).toBe(0);
        expect(murray.length).toBe(0);
        expect(murray instanceof Murray).toBe(true);
        expect(filtered instanceof Murray).toBe(true);
    });

    it('should fail with a TypeError when the first argument is not a callback function', function() {
        expect(function () {
            new Murray(1,2,3,4,5).filter();
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function () {
            new Murray(1,2,3,4,5).filter(-5);
        }).toThrowError(TypeError, '-5 is not a function');

        expect(function () {
            new Murray(1,2,3,4,5).filter(false);
        }).toThrowError(TypeError, 'false is not a function');

        expect(function () {
            new Murray(1,2,3,4,5).filter({});
        }).toThrowError(TypeError, '[object Object] is not a function');

        expect(function () {
            new Murray(1,2,3,4,5).filter('oso');
        }).toThrowError(TypeError, 'oso is not a function');
    });

    it('should work even when argument(s) have been wrongly placed after the callback function', function () {
        var murray = new Murray(1,2,3,4,5);
        var filtered = murray.filter(function(value) { return value > 2 }, 'oso');

        expect(filtered.length).toBe(3);
        expect(filtered[0]).toBe(3);

        var _murray = new Murray(1,2,3,4,5);
        var _filtered = _murray.filter(function(value) { return value > 2 }, function(value) { return value > 0 });

        expect(_filtered.length).toBe(3);
        expect(_filtered[0]).toBe(3);
    });
})
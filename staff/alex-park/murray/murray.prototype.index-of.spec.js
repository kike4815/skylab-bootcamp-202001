if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.prototype.indexOf', function () {
    it('should return the index of the element in the murray given as a first argument', function() {
        var murray = new Murray(1,2,3,4,5);
        var indexed = murray.indexOf(3);

        expect(indexed).toBe(2);

        var _murray = new Murray('a','b','c','d');
        var _indexed = _murray.indexOf('b');

        expect(_indexed).toBe(1);
    });

    it('should return -1 if the searched element is not included on the murray', function() {
        var murray = new Murray(1,2,3,4,5);
        var indexed = murray.indexOf(10);

        expect(indexed).toBe(-1);
    });

    it('should allow a second argument that stablishes from what position it starts looking', function() {
        var murray = new Murray(1,2,3,4,5);
        var indexed = murray.indexOf(3,1);

        expect(indexed).toBe(2);

        var _murray = new Murray(1,2,3,4,5);
        var _indexed = _murray.indexOf(2,3);

        expect(_indexed).toBe(-1);
    });

    it('should allow the second argument to be a negative value, where it reads as backwards positioning', function() {
        var murray = new Murray(1,2,3,4,5);
        var indexed = murray.indexOf(3,-4);

        expect(indexed).toBe(2);

        var _murray = new Murray(1,2,3,4,5);
        var _indexed = _murray.indexOf(2,-2);

        expect(_indexed).toBe(-1);
    });

    it('should work even when the second argument is not a number nor an integer. In that case, it works as if no positioning was placed at all', function() {
        var murray = new Murray(1,2,3,4,5);
        var indexed = murray.indexOf(2, function(){});

        expect(indexed).toBe(1);

        var _murray = new Murray(1,2,3,4,5);
        var _indexed = _murray.indexOf(2,'caca');

        expect(_indexed).toBe(1);

        var murray2 = new Murray(1,2,3,4,5);
        var indexed2 = murray2.indexOf(3, 1.5);

        expect(indexed2).toBe(2);
    });
})
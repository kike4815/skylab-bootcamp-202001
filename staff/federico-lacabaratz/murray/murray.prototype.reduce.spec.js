if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.reduce', function() {

    it('It should return a new single value equal to the summ of al numbers within the murray', function() {
        var murray = new Murray(0, 1, 2, 3, 4);
        var result = murray.reduce(function(accumulator, currentVal) {
            return accumulator + currentVal;
        });
        expect(result).toBe(10);
    });

    it ("It shouldn't modify the original murray", function () {

        var murray = new Murray (0, 1, 2, 3, 4);
        var testForMurray = new Murray (0, 1, 2, 3, 4);

        var result = murray.reduce(function(accumulator, currentVal) {
            return accumulator + currentVal;
        });

        expect(murray.length).toBe(testForMurray.length);
        expect(murray[0]).toBe(testForMurray[0]);
        expect(murray[1]).toBe(testForMurray[1]);
        expect(murray[2]).toBe(testForMurray[2]);
        expect(murray[3]).toBe(testForMurray[3]);
        expect(murray[4]).toBe(testForMurray[4]);
    })
    
    it('should fail on non-function expressions or empty murray', function () {
        expect(function () {
            var murray = new Murray(0, 1, 2, 3, 4)
            murray.reduce(); 
        }).toThrowError(TypeError, 'undefined is not a function');
        expect(function () {
            new Murray(0, 1, 2, 3, 4).reduce(true);
        }).toThrowError(TypeError, 'true is not a function');
        
        expect(function () {
            new Murray(0, 1, 2, 3, 4).reduce(1);
        }).toThrowError(TypeError, '1 is not a function');
        expect(function () {
            var murray = new Murray().reduce(function() {
            }).toThrowError(TypeError, 'Impossible to reduce an empty murray without an initial value');
        });
    });
});
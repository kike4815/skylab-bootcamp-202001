if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.every', function() {

    it('Returns \'true\' if all elements in a murray are < than 51', function () {
        var murray = new Murray(1, 10, 20, 32, 15, 50, 40, 49);
        
        var result = murray.every(function(value) {
            if(value < 51) {
                return true
            }
        });
        
        expect(result).toBe(true);
        
    });
    
    it('Returns \'true\' if all elements in a murray are > than 5', function () {
        var murray = new Murray(7, 10, 20, 32, 15, 50, 40, 49);
        
        var result = murray.every(function(value) {
            if(value > 5) {
                return true
            }
        });
        
        expect(result).toBe(true);
        
    });
    
    it('Verifies all elements comply with the original condition (value < 51)', function () {
        var murray = new Murray(1, 10, 20, 32, 15, 50, 40, 49);
        
        var result = []
        
        murray.forEach(function(item) {
            result.push(item < 51)
        })
        
        expect(result[0]).toBe(true);
        expect(result[1]).toBe(true);
        expect(result[2]).toBe(true);
        expect(result[3]).toBe(true);
        expect(result[4]).toBe(true);
        expect(result[5]).toBe(true);
        expect(result[6]).toBe(true);
        expect(result[7]).toBe(true);
    })

    it('should fail on non-function expression', function () {
        expect(function () {
            new Murray(1, 2, 3).every();
        }).toThrowError(TypeError, 'undefined is not a function');
        
        expect(function () {
            new Murray(1, 2, 3).every(true);
        }).toThrowError(TypeError, 'true is not a function');

        expect(function () {
            new Murray(1, 2, 3).every(1);
        }).toThrowError(TypeError, '1 is not a function');

        expect(function () {
            new Murray(1, 2, 3).every(null);
        }).toThrowError(TypeError, 'null is not a function');
    })
});

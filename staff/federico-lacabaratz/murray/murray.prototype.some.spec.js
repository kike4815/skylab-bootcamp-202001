if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.some', function () {

    it('It should return \'true\' if there is a value within the murray that fulfills the condition', function () {
        var murray = new Murray(1, 2, 3);

        var result = murray.some(function(value) {
            return value === 3;
        });
        expect(result).toBe(true);
    });
    
    it('It should return \'false\' if there is NOT a value within the murray that fulfills the condition', function () {
        var murray = new Murray(1, 2, 3);

        var result = murray.some(function(value) {
            return value === 4;
        });
        expect(result).toBe(false);
    });
    
    it('It should return \'true\' if at least one number is bigger than 2 within the murray', function () {
        var murray = new Murray(1, 2, 3);

        var result = murray.some(function(value) {
            return value > 2;
        });
        expect(result).toBe(true);
    });
    
    it('It should return \'true\' if at least one value is a string within the murray', function () {
        var murray = new Murray(1, 'js', undefined);

        var result = murray.some(function(value) {
            return typeof value === 'string';
        });
        expect(result).toBe(true);
    });

    it('should fail on non-function expression', function () {
        expect(function () {
            var murray = new Murray(1, 5, 10, 15)
            murray.some(); 
        }).toThrowError(TypeError, 'undefined is not a function');
        expect(function () {
            new Murray(1, 5, 10, 15).some(true);
        }).toThrowError(TypeError, 'true is not a function');        
        expect(function () {
            new Murray(1, 5, 10, 15).some(1);
        }).toThrowError(TypeError, '1 is not a function');
    });
});

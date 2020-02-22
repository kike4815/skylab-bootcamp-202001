if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.findIndex', function () {

    it('It should return the index number of the first number in the murray > than 13', function () {
        var murray = new Murray(5, 12, 8, 130, 44, 89);
    
        var result = murray.findIndex(function(value) {
            return value > 13;
        })
        expect(result).toBe(3);
    });
    
    it('It should return the index number of the first value that is a \'string\' within the murray', function () {
        var murray = new Murray(5, 'code', 8, 'murray', 44, 89);
        
        var result = murray.findIndex(function(value) {
            return typeof value === 'string';
        })
        expect(result).toBe(1);
    });
    
    it('It should return \'-1\' if it can not find the value it\'s after within the murray', function () {
        var murray = new Murray(5, 12, 8, 130, 44, 89);
    
        var result = murray.findIndex(function(value) {
            return value > 140;
        })
        expect(result).toBe(-1);
    });

    it('should fail on non-function expression', function () {
        expect(function () {
            var murray = new Murray(1, 5, 10, 15)
            murray.findIndex(); 
        }).toThrowError(TypeError, 'undefined is not a function');
        expect(function () {
            new Murray(1, 5, 10, 15).findIndex(true);
        }).toThrowError(TypeError, 'true is not a function');        
        expect(function () {
            new Murray(1, 5, 10, 15).findIndex(1);
        }).toThrowError(TypeError, '1 is not a function');
    });
});

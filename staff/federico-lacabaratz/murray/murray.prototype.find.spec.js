if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.find', function () {

    it('It should return the first number within the murray that is > than 13', function () {

        var murray = new Murray(5, 12, 8, 130, 44, 89);

        var result = murray.find(function (value) {
            return value > 13;
        });
        expect(result).toBe(130);
    });
    
    it('It should return the first number within the murray that is < than 20', function () {

        var murray = new Murray(44, 19, 130, 5, 8, 13, 89);

        var result = murray.find(function (value) {
            return value < 20;
        });
        expect(result).toBe(19);
    });
    
    it('It should return \'undefined\' if there is no number that fulfills the condition within the murray', function () {

        var murray = new Murray(44, 19, 130, 5, 8, 13, 89);

        var result = murray.find(function (value) {
            return value > 140;
        });
        expect(result).toBe(undefined);
    });

    it('should fail on non-function expression', function () {
        expect(function () {
            var murray = new Murray(1, 5, 10, 15)
            murray.find(); 
        }).toThrowError(TypeError, 'undefined is not a function');
        expect(function () {
            new Murray(1, 5, 10, 15).find(true);
        }).toThrowError(TypeError, 'true is not a function');        
        expect(function () {
            new Murray(1, 5, 10, 15).find(1);
        }).toThrowError(TypeError, '1 is not a function');
    });
});


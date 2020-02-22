if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.indexOf', function () {

    it('It verifies that the input number is included within the murray and returns its index number position', function () {
        var murray = new Murray(3, 4, 67, 75, 32);
        var included = 75;

        var result = murray.indexOf(included)

        expect(result).toBe(3);
    });
    
    it('It verifies that the input number is NOT included within the murray and returns \'-1\' as a response', function () {
        var murray = new Murray(32, 45, 2, 1, 56, 78);
        var included = 70;

        var result = murray.indexOf(included)

        expect(result).toBe(-1);
    });
    
    it('It should fail on an undefined murray', function () {
        expect(function () {
            var murray = new Murray;
            murray.indexOf(1);
        }).toThrowError(TypeError, 'Cannot read property \'indexOf\' of undefined');
    });
});
if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.Includes', function() {

    it('It verifies that the input number is included within the murray', function () {
    var murray = new Murray(32, 45, 2, 1, 56, 78);
    var included = 78;

    var result = murray.includes(included)

    expect(result).toBe(true);
    });
    
    it('It verifies that the input number is NOT included within the murray', function () {
    var murray = new Murray(32, 45, 2, 1, 56, 78);
    var included = 70;

    var result = murray.includes(included)

    expect(result).toBe(false);
    });
    
    it('It should fail on an undefined murray', function () {
        expect(function () {
            var murray = new Murray;
            murray.includes(1);
        }).toThrowError(TypeError, 'Cannot read property \'includes\' of undefined');
    });
});
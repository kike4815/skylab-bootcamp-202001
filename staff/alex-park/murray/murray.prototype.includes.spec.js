if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.prototype.includes', function () {
    it('should return a boolean value of true if the value specified as the first argument is included on the murray', function() {
        var murray = new Murray(1,2,3,4,5);
        var included = murray.includes(4);

        expect(included).toBe(true);
        expect(typeof included === 'boolean').toBe(true);
    });

    it('should return a boolean value of false if the element is not found anywhere on the murray', function () {
        var murray = new Murray(1,2,3,4,5);
        var included = murray.includes(4000);

        expect(included).toBe(false);
        expect(typeof included === 'boolean').toBe(true);
    });

    it('should allow a second integer argument representing the starting position of where to look for the value', function () {
        var murray = new Murray(1,2,3,4,5);
        var included = murray.includes(4,2);

        expect(included).toBe(true);
        expect(typeof included === 'boolean').toBe(true);

        var _murray = new Murray(1,2,3,4,5);
        var _included = _murray.includes(2, 4);

        expect(_included).toBe(false);
        expect(typeof _included === 'boolean').toBe(true);
    });

    it('should allow a negative value for the second argument. In that case, it works as counting backwards', function () {
        var murray = new Murray(1,2,3,4,5);
        var included = murray.includes(4, -3);

        expect(included).toBe(true);
        expect(typeof included === 'boolean').toBe(true);
    });

    it('should transform the second argument to zero if it has been wrongly spelt', function () {
        var murray = new Murray(1,2,3,4,5);
        var included = murray.includes(4, 'oso');

        expect(included).toBe(true);
        expect(typeof included === 'boolean').toBe(true);
    });

    it('should transform the second argument to a number if possible', function () {
        var murray = new Murray(1,2,3,4,5);
        var included = murray.includes(1, '1');

        expect(included).toBe(false);
        expect(typeof included === 'boolean').toBe(true);

        var _murray = new Murray(1,2,3,4,5);
        var _included = _murray.includes(1, true);

        expect(_included).toBe(false);
        expect(typeof _included === 'boolean').toBe(true);
    });

    it('should parse the second argument to an integer value if possible', function () {
        var murray = new Murray(1,2,3,4,5);
        var included = murray.includes(4, 1.3);

        expect(included).toBe(true);
        expect(typeof included === 'boolean').toBe(true);
    });
})
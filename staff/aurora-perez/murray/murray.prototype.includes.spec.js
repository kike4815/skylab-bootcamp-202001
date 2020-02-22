if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe('Murray.prototype.includes', function () {
    it('should return a boolean value of TRUE if the value specified as the first argument is result on the murray', function() {
        var murray = new Murray(1,2,3,4,5);
        var result = murray.includes(4);

        expect(result).toBe(true);
        expect(typeof result === 'boolean').toBe(true);
    });


    it('should return a boolean value of FALSE if the element is not found anywhere on the murray', function () {
        var murray = new Murray(1,2,3,4,5);
        var result = murray.includes(4000);

        expect(result).toBe(false);
        expect(typeof result === 'boolean').toBe(true);
    });


    it('should allow a second integer argument representing the starting position of where to look for the value', function () {
        var murray = new Murray(1,2,3,4,5);
        var result = murray.includes(4,2);

        expect(result).toBe(true);
        expect(typeof result === 'boolean').toBe(true);

        var _murray = new Murray(1,2,3,4,5);
        var _result = _murray.includes(2, 4);

        expect(_result).toBe(false);
        expect(typeof _result === 'boolean').toBe(true);
    });

    it('should allow a negative value for the second argument. In that case, it works as counting backwards', function () {
        var murray = new Murray(1,2,3,4,5);
        var result = murray.includes(4, -3);

        expect(result).toBe(true);
        expect(typeof result === 'boolean').toBe(true);
    });

    it('should transform the second number argument to zero if it has been other type', function () {
        var murray = new Murray(1,2,3,4,5);
        var result = murray.includes(4, 'hello');

        expect(result).toBe(true);
        expect(typeof result === 'boolean').toBe(true);
    });

    it('should transform the second argument to a number if possible', function () {
        var murray = new Murray(1,2,3,4,5);
        var result = murray.includes(1, '1');

        expect(result).toBe(false);
        expect(typeof result === 'boolean').toBe(true);

        var _murray = new Murray(1,2,3,4,5);
        var _result = _murray.includes(1, true);

        expect(_result).toBe(false);
        expect(typeof _result === 'boolean').toBe(true);
    });

     it('should parse the second argument to an integer value if possible', function () {
        var murray = new Murray(1,2,3,4,5);
        var result = murray.includes(4, 1.3);

        expect(result).toBe(true);
        expect(typeof result === 'boolean').toBe(true);
    });
})











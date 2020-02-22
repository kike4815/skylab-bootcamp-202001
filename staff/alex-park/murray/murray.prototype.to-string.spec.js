if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe("Murray.prototype.toString", function () {
    it("should return a string with all values of the murray, separated by a comma", function() {
        var murray = new Murray(1, 2, 3);
        var str = murray.toString();

        expect(str).toBe('1,2,3');
        expect(typeof str === 'string').toBe(true);
    });

    it('should make undefined values as empty on the string, but keeping the separating commas', function() {
        var murray = new Murray(1,2,3,4,5,undefined);
        var str = murray.toString();

        expect(str).toBe('1,2,3,4,5,');
        expect(typeof str === 'string').toBe(true);
    });

    it('should keep the empty space between values if the undefined value is not the last one', function() {
        var murray = new Murray(1,2,3,undefined,4,5,6);
        var str = murray.toString();

        expect(str).toBe('1,2,3,,4,5,6');
        expect(typeof str === 'string').toBe(true);
        expect(murray).toBeInstanceOf(Murray);
    })

    if('should stringify the murray even if arguments have been accidentally called', function() {
        var murray = new Murray(1,2,3,4);
        var str = murray.toString(true, function(){}, -1, 'oso');

        expect(str).toBe('1,2,3,4');
        expect(typeof str === 'string').toBe(true);
    });

})

if(typeof require !== 'undefined')
    var Murray = require("./murray")
    
describe("Murray.prototype.toString", function () {
    it("should return a string with all values of the murray, separated by a comma", function() {
        var murray = new Murray (1, 2, 3, 4);
        var result = murray.toString();

        expect(result).toBe('1,2,3,4');
        expect(typeof result === 'string').toBe(true);
    })

    it('should return a string with an empty space in the position where the undefined is', function(){
        var murray = new Murray (1, 2, undefined, 4, 5);
        var result = murray.toString();

        expect(result).toBe('1,2,,4,5');
        expect(typeof result === 'string').toBe(true);
    })

    it('should return a string with a coma in the last position where the undefined is', function(){
        var murray = new Murray (1, 2, 3, 4, undefined);
        var result = murray.toString();

        expect(result).toBe('1,2,3,4,');
        expect(typeof result === 'string').toBe(true);
    })
    it("should return a string with all values of the murray, separated by a comma, whatever the type of the arguments ", function() {
        var murray = new Murray (true, 'a', 3, 4, undefined);
        var result = murray.toString();

        expect(result).toBe('true,a,3,4,')
        expect(typeof result === 'string').toBe(true);
    })
})
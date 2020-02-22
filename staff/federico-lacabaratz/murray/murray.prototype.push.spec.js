if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.push', function () {
    it('should have added 4 at the end of murray [1, 2, 3]', function () {
        var murray = new Murray(1, 2, 3);
        var result = murray.push(4);
        

        expect(result).toBe(4);
        expect(murray[murray.length - 1]).toBe(4);

        murray.forEach(function (value, index) {
            expect(value).toBe(index + 1);
        });
    });

    it('should have added 5 at the end of murray [1, 2, 3, 4]', function () {
        var murray = new Murray(1, 2, 3, 4);
        var result = murray.push(5);
        
        expect(result).toBe(5);
        expect(murray[murray.length - 1]).toBe(5);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
        expect(murray[3]).toBe(4);
    });
});
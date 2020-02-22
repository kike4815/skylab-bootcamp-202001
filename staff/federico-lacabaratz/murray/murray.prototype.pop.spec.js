if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.pop', function () {

    it('should have delete 4 at the end of murray [1, 2, 3, 4]', function () {
        var murray = new Murray(1, 2, 3, 4);
        var results = murray.pop();

        expect(results).toBe(4);
        expect(murray[murray.length - 1]).toBe(3);

        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
    });

    it('should have delete 5 at the end of murray [1, 2, 3, 4, 5]', function () {
        var murray = new Murray(1, 2, 3, 4, 5);
        var results = murray.pop();
        
        expect(results).toBe(5);
        expect(murray[murray.length - 1]).toBe(4);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
        expect(murray[3]).toBe(4);
    });
});

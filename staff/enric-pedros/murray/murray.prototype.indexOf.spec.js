if (typeof require !== 'undefined'){

    var Murray = require('./murray')
}


describe('Murray prototype IndexOf', function () {

    it('should return the index of the value find it', function () {
        var murray = new Murray(1, 2, 'a', 'b');
        var result = murray.indexOf(1);

        expect(result).toBe(0);
    });

    it('should return the same value but start with an Index', function () {
        var murray = new Murray(1, 2, 'a', 'b');
        var result = murray.indexOf('a', 1);

        expect(result).toBe(2);

    });
    it('should return the same value but start with a Negative Index', function () {
        var murray = new Murray(1, 2, 'a', 'b');
        var result = murray.indexOf(2, -1);

        expect(result).toBe(1);

    });

})
if (typeof require !== 'undefined'){

    var Murray = require('./murray')
}

describe('Murray prototype concat', function(){

    it('should return the plus of the in arrays', function () {
        var murray = new Murray(1, 2, 'a','b');
        var moorray = new Murray(3, 4,'c','d')
        var result = murray.concat(moorray);

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe('a');
        expect(result[3]).toBe('b');
        expect(result[4]).toBe(3);
        expect(result[5]).toBe(4);
        expect(result[6]).toBe('c');
        expect(result[7]).toBe('d');

    });

    it('should return the total length of the older arrays', function () {
        var murray = new Murray(1, 2, 'a','b');
        var moorray = new Murray(3, 4,'c','d')
        var result = murray.concat(moorray);

        expect(result.length).toBe(8);

    });

    it('should return the same murray with any argument', function () {
        var murray = new Murray(1, 2, 'a','b');
        var result = murray.concat();

        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe('a');
        expect(result[3]).toBe('b');
        expect(result.length).toBe(4);
    })    

})
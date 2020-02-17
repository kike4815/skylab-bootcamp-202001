const Murray = require('./murray')

describe('Murray prototype UNshift', function(){

    it('should return the new length of the same array', function () {
        var murray = new Murray(1, 2, 'a','b');
        var result = murray.unshift(-1,0);

        expect(result).toBe(6);
        expect(murray[0]).toBe(-1);
        expect(murray[1]).toBe(0);
        expect(murray[2]).toBe(1);
        expect(murray[3]).toBe(2);
        expect(murray[4]).toBe('a');
        expect(murray[5]).toBe('b');


    });

    it('should return the same length ', function () {
        var murray = new Murray(1, 2, 'a','b');
        var result = murray.unshift();

        expect(murray.length).toBe(4);

    });
    
})
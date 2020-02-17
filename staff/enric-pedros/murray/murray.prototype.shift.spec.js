if (typeof require !== 'undefined'){

    var Murray = require('./murray')
}

describe('Murray prototype shift', function(){

    it('should return the first position', function () {
        var murray = new Murray(1, 2, 'a','b');
        var result = murray.shift();

        expect(result).toBe(1);
        expect(murray[0]).toBe(2);
        expect(murray[1]).toBe('a');
        expect(murray[2]).toBe('b');

    });

    it('should return the array length less one ', function () {
        var murray = new Murray(1, 2, 'a','b');
        var result = murray.shift();

        expect(murray.length).toBe(3);

    });
    
})
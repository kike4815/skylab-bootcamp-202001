if (typeof require !== 'undefined'){

    var Murray = require('./murray')
}

describe('Murray prototype pop', function(){

    it('should return the last position', function () {
        var murray = new Murray(1, 2, 'a','b');
        var result = murray.pop();

        expect(result).toBe('b');
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe('a');

    });
    
    it('should modify the original array with length - 1', function () {
        var murray = new Murray(1, 2, 'a','b');
        var result = murray.pop();

        expect(murray.length).toBe(3);

    });

})
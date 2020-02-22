if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.reverse', function(){
    
    it('Should reverse all elements of the murray.', function(){
        
        var murray = new Murray('1','2','3','4');
        var copy = new Murray('1','2','3','4');

        var result = murray.reverse();
        
        expect(result[0]).toBe(copy[3]);
        expect(result[1]).toBe(copy[2]);
        expect(result[2]).toBe(copy[1]);
        expect(result[3]).toBe(copy[0]);
        expect(result.length).toBe(copy.length);
    });
    
    it('Should verify all numbers within murray to be reversed', function(){
        var murray = new Murray(1, 2, 3, 4);
        var copy = new Murray(1, 2, 3, 4);

        var result = murray.reverse();
        
        expect(result[0]).toBe(copy[3]);
        expect(result[1]).toBe(copy[2]);
        expect(result[2]).toBe(copy[1]);
        expect(result[3]).toBe(copy[0]);
    });
});
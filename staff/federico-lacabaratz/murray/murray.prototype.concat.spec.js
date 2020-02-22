if (typeof require !== 'undefined')  var Murray = require('./murray');

describe("Murray.prototype.concat", function() {
    
    it("Verifies that concatenates 2 murrays into a new murray", function(){
        var murray = new Murray(1, 2, 3);
        var murray2 = new Murray(4, 5, 6, 7);
        
        var result = murray.concat(murray2);        
        expect(result.length).toBe(7);
        
        for(var i=0; i<result.length; i++) {
            expect(result[i]).toBe(i + 1);
        }
    }) 
    it('Verifies that can concatenates \'n\' amount of murrays', function () {
        var murray = new Murray(1, 2, 3);
        var murray2 = new Murray(4, 5, 6);
        var murray3 = new Murray(7, 8, 9);
        var murray4 = new Murray(10, 11, 12);
        
        var result = murray.concat(murray2, murray3, murray4);    
        expect(result.length).toBe(12);
        
        for(var i=0; i<result.length; i++) {
            expect(result[i]).toBe(i + 1);
        }
    
    })
    it('Verifies the original murray does not mutate', function() {
        var murray = new Murray(1, 2, 3);
        var murray2 = new Murray(4, 5, 6, 7);
        
        var result = murray.concat(murray2);       
        expect(murray[0]).toBe(1);
        expect(murray2[0]).toBe(4);
        expect(murray.length).toBe(3);
        expect(murray2.length).toBe(4);
    })
    it('should return a new murray as the original, but with all parameters pushed when passed a \'n\' non-murray as parameter', function () {
        var murray = new Murray(2, 6, 8);
        var result = murray.concat('a', 1, true, undefined, null, {a: 12, b: 21});        
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(6);
        expect(result[2]).toBe(8);
        expect(result[3]).toBe('a');
        expect(result[4]).toBe(1);
        expect(result[5]).toBe(true);
        expect(result[6]).toBe(undefined);        
        expect(result[7]).toBe(null);        
        expect(result[8]).toBeInstanceOf(Object);        
    })

})    

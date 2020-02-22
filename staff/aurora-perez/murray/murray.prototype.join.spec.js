if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe('Murray.prototype.join', function() {
    it("should returns a new string by concatenating all of the elements in an array, separated by specified separator string", function() {
        var murray = new Murray (1, 2, 3);
        var result = murray.join('**');

        expect(typeof result).toBe('string');
        expect(result).toBe('1**2**3');


        var murray2 = new Murray ('a', 'b', 'c');
        var result2 = murray2.join('-');

        expect(typeof result2).toBe('string');
        expect(result2).toBe('a-b-c');
           
    })      
    
    it ('should not modify the original murray', function(){
        var murray = new Murray (1, 2, 3);
        murray.join('hello');

        expect(murray instanceof Murray).toBe(true);
        expect(murray.length).toBe(3);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
    })

    it('should return a new murray in spite of the type of separator', function(){
        var murray =  new Murray (1,2,3);
        result = murray.join(function(){});

        expect(result).toBe("1function(){}2function(){}3")
        expect(murray instanceof Murray).toBe(true);

        var murray2 =  new Murray (1,2,3);
        result2 = murray2.join(true);

        expect(result2).toBe("1true2true3")
        expect(murray2 instanceof Murray).toBe(true);

    })

    it('should works in spite of adding a second argument by error', function() {
        var murray = new Murray (1, 2, 3);
        result = murray.join('uuu', true);

        expect(murray instanceof Murray).toBe(true);
        expect(murray.length).toBe(3);
        expect(result).toBe('1uuu2uuu3');
    })
   
})


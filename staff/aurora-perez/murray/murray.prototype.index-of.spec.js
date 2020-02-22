if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe('Murray.prototype.indexOf', function() {
    it('should return the index of the identified value, from certain position.', function () {
        var murray = new Murray (10, 20, 30, 40, 50, 60, 70);

        var result = murray.indexOf(50, -2);
        expect(result).toBe(-1);

        var result1 = murray.indexOf(30, 1);
        expect(result1).toBe(2);    
    })

    it('should it returns -1 if the value is not on the murray', function(){
        var murray = new Murray (1, 2, 'a')

        var result1 =  murray.indexOf(100);
        expect(result1).toBe(-1)
    })

    it("should return the index if the position is wrongly specified", function() {
        var murray = new Murray (1, 5, 11, 15, 20);

        var result =  murray.indexOf(11, 'hello');
        expect(result).toBe(2);
        
        var result1 = murray.indexOf(15, undefined);
        expect(result1).toBe(3);
    })

    it ('should return position 1 if you put true as a second argument', function (){
        var murray = new Murray (1, 2, 3, 4);

        var result = murray.indexOf(1, true);
        expect(result).toBe(-1);

        var result2 = murray.indexOf(3, true)
        expect(result2).toBe(2);
    })
})
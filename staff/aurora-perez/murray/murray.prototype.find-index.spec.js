if(typeof require !== 'undefined')
    var Murray = require("./murray")

describe('murray.prototype.findIndex', function() {
    it('should return the index of the first element in the murray that satisfies the provided testing callback. Otherwise, it returns -1', function () {
        var murray = new Murray (1, 5, 10, 20);
        var result = murray.findIndex(function(value){ return value > 5});
        expect(result).toBe(2);

        var murray2 =  new Murray (5, 10, 20, 20, 20, 40, 20);
        var result2 = murray2.findIndex (function(value){ return value ===20});
        expect(result2).toBe(2);
    })

    
    it ('should return -1 if there is no elementthat satisfies the callback condition', function() {
        var murray = new Murray (1, 2, 3, 4);
        var result = murray.findIndex (function(value) { return value > 5});
        expect(result).toBe(-1);

        var murray2 = new Murray (1, 2, 3, 4, 100);
        var result2 = murray2.findIndex (function(value) { return value === 5});
        expect(result2).toBe(-1);
    })


    it('should still works in spite of put more arguments after the callback', function(){
        var murray = new Murray (1, 2, 3, 10);
        var result = murray.findIndex( function (value) { return value === 2}, 1);
        expect(result).toBe(1);

        var murray2 = new Murray (1, 2, 3, 10);
        var result2 = murray2.findIndex( function (value) { return value === 2}, 'hello');
        expect(result2).toBe(1);

        var murray3 = new Murray (1, 2, 3, 10);
        var result3 = murray3.findIndex( function (value) { return value === 2}, true);
        expect(result3).toBe(1);

    })

    it("should fail if the first argument is not an murray, giving a TypeError", function () {
        expect(function(){
            new Murray (1, 2, 3).findIndex()
        }).toThrowError(TypeError,'undefined is not a function.');

        expect(function(){
            new Murray (1, 2, 3).findIndex('a')
        }).toThrowError(TypeError,'a is not a function.');

        expect(function(){
            new Murray (1, 2, 3).findIndex(1)
        }).toThrowError(TypeError,'1 is not a function.');

        expect(function(){
            new Murray (1, 2, 3).findIndex({})
        }).toThrowError(TypeError, '[object Object] is not a function.');
        
    })
})
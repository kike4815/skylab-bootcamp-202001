if(typeof require !== 'undefined')
    var Murray = require("./murray")

describe('Murray.prototype.find', function(){
    it('should returns the value of the first element in the provided murray that satisfies the provided testing callback', function(){

        var murray = new Murray (1, 2, 3, 4);
        var result = murray.find( function(value) { return value > 2});
        expect(result).toBe(3);


        var murray2 = new Murray ('a','b','c','d');
        var result2= murray2.find (function(value) {return value > 'b'});
        expect(result2).toBe('c');

    })

    it('should return undefined if there is no element that satisfies the testing callback', function(){
        var murray = new Murray (10, 20, 30, 40);
        var result = murray.find(function(value){return value > 50});
        expect(result).toBeUndefined();

        var murray2 = new Murray ( 1, 30, 'b', 'hello');
        var result2 = murray2.find(function(value){return value === 2});
        expect(result2).toBeUndefined();

    })

    it('should works no matter the number of the arguments after the callback', function(){
        var murray = new Murray (1, 2, 3, 4);
        var result =  murray.find(function (value) {return value>3}, 'hello', 1 );
        expect(result).toBe(4);

    })

    it("should fail when the second argument is not a function, giving a TypeError", function(){
        expect(function(){
            new Murray (1, 2, 3).find()
        }).toThrowError(TypeError, 'undefined is not a function.');

        expect(function(){
            new Murray (5, 6, 7, 8 ).find(1);
        }).toThrowError(TypeError,'1 is not a function.' );

        expect(function(){
            new Murray ('a', 'b', 'c').find('hello')
        }).toThrowError(TypeError, 'hello is not a function.')

    })
});
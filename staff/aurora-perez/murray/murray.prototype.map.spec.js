if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe('Murray.prototype.map', function(){
    it ("it should a new murray with the applied calback ", function(){
        var murray = new Murray (1, 2, 3); 
        var result = murray.map(function(value){ return value * 10})

        expect(result[0]).toBe(10);
        expect(result[1]).toBe(20);
        expect(result[2]).toBe(30);
        expect(result.length).toBe(3)
        expect(result).toBeInstanceOf(Murray);
        expect(result.length).toBe(3);


        var murray2 = new Murray ('a', 'b', 'c')
        var result2 = murray2.map(function(value) {return value += '-hello'});

        expect(result2[0]).toBe('a-hello');
        expect(result2[1]).toBe('b-hello');
        expect(result2[2]).toBe('c-hello');
        expect(result2).toBeInstanceOf(Murray);
        expect(result2.length).toBe(3);
    });

    it ('should not modifiy the original murray', function() {
        var murray = new Murray (1, 2, 3); 
        var result = murray.map(function(value){ return value * 10})

        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
        expect(murray.length).toBe(3);
        expect(murray).toBeInstanceOf(Murray);


        var murray2 = new Murray ('a', 'b', 'c')
        var result2 = murray2.map(function(value) {return value += '-hello'});

        expect(murray2[0]).toBe('a');
        expect(murray2[1]).toBe('b');
        expect(murray2[2]).toBe('c');
        expect(murray2.length).toBe(3);
        expect(murray2).toBeInstanceOf(Murray);

    })

    it('should return a new murray, even if you placed accidentally a second argument in addition to callback', function(){
        var murray = new Murray (1,2,3);
        var result = murray.map(function(value){return value + 2});

        expect(result[0]).toBe(3);
        expect(result[1]).toBe(4);
        expect(result[2]).toBe(5);
        expect(result.length).toBe(3)
        expect(result).toBeInstanceOf(Murray);
        expect(result.length).toBe(3);

    })

    it ('should fail on non-function expression with TypeError', function() {
        expect(function(){
            new Murray(1, 2, 3).map()
        }).toThrowError(TypeError, 'undefined is not a function');


        expect(function(){
            new Murray(1, 2, 3).map(1)
        }).toThrowError(TypeError, '1 is not a function');


        expect(function(){
            new Murray(1, 2, 3).map('hello')
        }).toThrowError(TypeError, 'hello is not a function');
    })

})
       
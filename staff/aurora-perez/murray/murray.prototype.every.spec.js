if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe ('murray.prototype.every', function(){
    it('it tests whether all elements in the murray pass the test implemented by the provided function. It returns a Boolean value. TRUE if all pass the test', function(){
        var murray = new Murray (1, 2, 3);
        var result = murray.every(function(value) { return value < 5});

        expect(result).toBe(true);
    });

    it('it tests whether all elements in the murray pass the test implemented by the provided function. It returns a Boolean value. FALSE if all pass the test', function(){
        var murray = new Murray ('a', 'a', 'a', 'b', 'a');
        var result = murray.every(function(value) {return value === 'a'});

        expect(result).toBe(false);
    });

    it ('should not modify the murray', function(){
        var murray = new Murray (1, 2, 3, 4, 5);
        var result = murray.every( function(value) {return value > 3});

        expect(murray.length).toBe(5);
        expect(murray instanceof Murray).toBe(true);
        expect(murray[0]).toBe(1)
        expect(murray[1]).toBe(2)
        expect(murray[2]).toBe(3)
        expect(murray[3]).toBe(4)
        expect(murray[4]).toBe(5)
    })

    it ('should still works even if you put more than callback argument by error', function(){
        var murray = new Murray (1, 2, 3);
        var result = murray.every(function(value) { return value < 5}, 'hello! :)');

        expect(result).toBe(true);


        var murray2 = new Murray (1, 2, 3);
        var result2 = murray2.every(function(value) { return value < 5}, 1);

        expect(result2).toBe(true);


        var murray3 = new Murray (1, 2, 3);
        var result3 = murray3.every(function(value) { return value < 5}, false);

        expect(result3).toBe(true);


        var murray4 = new Murray (1, 2, 3);
        var result4 = murray4.every(function(value) { return value < 5}, {holi:'holi'});

        expect(result4).toBe(true);
    })

    it("should fail when the second argument is not a function, giving a TypeError", function(){
        expect(function(){
            new Murray (1, 2, 3).every();
        }).toThrowError(TypeError, 'undefined is not a function.')

        expect(function(){
            new Murray (1, 2, 3).every('a');
        }).toThrowError(TypeError, 'a is not a function.')

        expect(function(){
            new Murray (1, 2, 3).every(false);
        }).toThrowError(TypeError, 'false is not a function.')

        expect(function(){
            new Murray (1, 2, 3).every(1);
        }).toThrowError(TypeError, '1 is not a function.')

        expect(function(){
            new Murray (1, 2, 3).every({});
        }).toThrowError(TypeError, '[object Object] is not a function.')

    });
});
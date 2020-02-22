if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe('murray.prototype.filter', function () {
    it('should return a new murray with elements that satisfays the callback condition', function () {
        var murray = new Murray (1, 2, 3, 4, 5, 6, 7, 8, 9);
        var result = murray.filter(function(value){ return value  > 5});

        expect(result.length).toBe(4);
        expect(result[0]).toBe(6);
        expect(result[1]).toBe(7)
        expect(result[2]).toBe(8)
        expect(result[3]).toBe(9)
        expect(result instanceof Murray).toBe(true);
    });

    it('should not modify the initial murray', function () {
        var murray = new Murray (1, 2, 3, 4, 5, 6, 7, 8, 9);
        var result = murray.filter(function(value){ return value  > 5});

        expect(murray.length).toBe(9);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
        expect(murray[3]).toBe(4);
        expect(murray[4]).toBe(5);
        expect(murray[5]).toBe(6);
        expect(murray[6]).toBe(7);
        expect(murray[7]).toBe(8);
        expect(murray[8]).toBe(9);
    });

    it('should still works in spite of put more than callback argument', function(){
        var murray = new Murray ('a', 'b', 'c', 'd');
        var result = murray.filter ( function (value){ return value ==='b'}, 1);

        expect(result.length).toBe(1);
        expect(result[0]).toBe('b');
        expect(result instanceof Murray).toBe(true);
        expect(murray.length).toBe(4);
        expect(murray instanceof Murray).toBe(true);

    })

    it ('should return an empty murray if the initial murray is empty too', function(){
        var murray = new Murray ();
        var result = murray.filter(function(value){ return value === 2});

        expect(result[0]).toBeUndefined();
        expect(result.length).toBe(0);
        expect(result instanceof Murray).toBe(true);

        expect(murray[0]).toBeUndefined();
        expect(murray.length).toBe(0);
        expect(murray instanceof Murray).toBe(true);
    })


    it ('should return an empty murray if any element satisfies the callback condition', function(){
        var murray = new Murray (1, 2, 3, 4);
        var result = murray.filter(function(value) { return value === 5 });

        expect(result[0]).toBeUndefined();
        expect(result.length).toBe(0);
        expect(result instanceof Murray).toBe(true);
    })


    it('should fail when the second argument is not a function, giving a TypeError', function(){
        expect(function(){
            new Murray (1,2,3).filter();
        }).toThrowError(TypeError, 'undefined is not a function.');

        expect(function(){
            new Murray (1,2,3).filter(true);
        }).toThrowError(TypeError, 'true is not a function.')

        expect(function(){
            new Murray (1,2,3).filter(1);
        }).toThrowError(TypeError, '1 is not a function.')

        expect(function(){
            new Murray (1,2,3).filter('a');
        }).toThrowError(TypeError, 'a is not a function.')
    })
})

if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe('Murray.prototype.push', function () {
    it('should have added 4 at the end of murray [1, 2, 3]', function () {
        var murray = new Murray(1, 2, 3);
        var length = murray.push(4);

        expect(length).toBe(4);
        expect(murray[murray.length - 1]).toBe(4);

        murray.forEach(function (value, index) {
            expect(value).toBe(index + 1);
        });
    });

    it('should have added 5 at the end of murray [1, 2, 3, 4]', function () {
        var murray = new Murray(1, 2, 3, 4);
        var length = murray.push(5);
        
        expect(length).toBe(5);
        expect(murray[murray.length - 1]).toBe(5);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
        expect(murray[3]).toBe(4);
    });

    it ('should not add any arguments at the end of a murray, and return the same length', function () {
        var murray = new Murray (1, 2, 3, 4);
        var length = murray.push();

        expect(length).toBe(4);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
        expect(murray[3]).toBe(4);
    });

    it ('should be able to add as many elements as arguments you establish', function(){
        var murray = new Murray (1, 2, 3);
        var length = murray.push(4, 5);

        expect(length).toBe(5);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
        expect(murray[3]).toBe(4);
        expect(murray[4]).toBe(5);

    })
    
    it ('should be able to add any type of element to the new murray', function(){
        var murray = new Murray (1, 2, 3);
        var length = murray.push(true, function(){}, 'a', undefined);
        expect(length).toBe(7);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
        expect(murray[3]).toBe(true);
        expect(murray[4]).toBeInstanceOf(Function);
        expect(murray[5]).toBe('a');
        expect(murray[6]).toBe(undefined);
    })
})
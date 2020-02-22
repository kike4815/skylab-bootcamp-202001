if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.prototype.pop', function(){
    it ('should return the same murray with the last value substracted', function(){
        var murray = new Murray(1,2,3);
        var popped = murray.pop();

        expect(popped).toBe(3);
        expect(murray.length).toBe(2);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);

        var murray = new Murray('a', 'b', 'c');
        var popped = murray.pop();

        expect(popped).toBe('c');
        expect(murray.length).toBe(2);
        expect(murray[0]).toBe('a');
        expect(murray[1]).toBe('b');
    })

    it('should pop the last value even when an argument is wrongly placed', function() {
        var murray = new Murray(1,2,3);
        murray.pop(5);

        expect(murray.length).toBe(2);
        expect(murray[2]).toBeUndefined();

        var murray = new Murray(1,2,3);
        murray.pop('a');

        expect(murray.length).toBe(2);
        expect(murray[2]).toBeUndefined();

        var murray = new Murray(1,2,3);
        murray.pop(false);

        expect(murray.length).toBe(2);
        expect(murray[2]).toBeUndefined();

        var murray = new Murray(1,2,3);
        murray.pop(undefined);

        expect(murray.length).toBe(2);
        expect(murray[2]).toBeUndefined();

        var murray = new Murray(1,2,3);
        murray.pop(function(){});

        expect(murray.length).toBe(2);
        expect(murray[2]).toBeUndefined();
    })

    it('should not throw any error message when you try to pop an empty murray', function() {
        var murray = new Murray();
        murray.pop();

        expect(murray.length).toBe(0);
    })


});
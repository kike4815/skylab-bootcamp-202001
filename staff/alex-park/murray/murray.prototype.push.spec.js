if (typeof require !== 'undefined')
    var Murray = require('./murray')

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

    it('should return the same length of a murray and it should not be modified when no value was added for push', function(){
        var murray = new Murray(1, 2, 3);
        var testMurray = murray.push();

        expect(murray.length).toBe(3);
        expect(testMurray).toBe(3);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
    });

    it('should add an undefined value when declared as such, and return the new murrays length', function() {
        var murray = new Murray(1, 2, 3);
        var testMurray = murray.push(undefined);

        expect(murray.length).toBe(4);
        expect(testMurray).toBe(4);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
        expect(murray[3]).toBeUndefined();
    });

    it('should push any number of elements into the murray if they have been set on the arguments',function(){
        var murray = new Murray(1, 2, 3);
        murray.push('a', 'b', 'c');

        expect(murray.length).toBe(6);
        expect(murray[3]).toBe('a');
    });
});
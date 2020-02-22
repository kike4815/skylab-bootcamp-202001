if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.prototype.constructor', function() {
    it('should by default instantiate a Murray instance with length 0', function() {
        var murray = new Murray;

        expect(murray).toBeInstanceOf(Murray);
        expect(murray.length).toBe(0);
    });

    it('should instantiate a Murray when multiple integer values in arguments', function() {
        var murray = new Murray(1, 2, 3);

        expect(murray).toBeInstanceOf(Murray);
        expect(murray.length).toBe(3);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
    });

    it('should instantiate a Murray with length equal to single integer value in arguments', function() {
        var murray = new Murray(100);

        expect(murray).toBeInstanceOf(Murray);
        expect(murray.length).toBe(100);

        for (var i = 0; i < murray.length; i++)
            expect(murray[i]).toBeUndefined()
    });

    it('should add undefined values for every position if only one integer value was in arguments', function() {
        var murray = new Murray(50);

        expect(murray.length).toBe(50);
        murray.forEach(function(value) { expect(value).toBeUndefined() });
    })

    it('should instantiate a Murray with length 1 when single non-integer value in arguments', function() {
        var murray = new Murray('a');

        expect(murray).toBeInstanceOf(Murray);
        expect(murray.length).toBe(1);
        expect(murray[0]).toBe('a');

        var murray2 = new Murray(function(){});

        expect(murray2.length).toBe(1);
        expect(murray2[0]).toBeInstanceOf(Function);
    });

    it('should instantiate a Murray with a Murray inside if it has been declared as such', function() {
        var murray = new Murray(new Murray(1, 2, 3));
        var murray2 = new Murray(1,2, new Murray(3,4), 5);

        expect(murray.length).toBe(1);
        expect(murray[0]).toBeInstanceOf(Murray);
        expect(murray2.length).toBe(4);
        expect(murray2[2]).toBeInstanceOf(Murray);
    });

    it('should fail when single value in arguments is numeric but not integer', function() {
        expect(function() {
            new Murray(1.1);
        }).toThrowError(RangeError, 'Invalid murray length');
    });

    it('should fail when a single value in arguments is numeric but negative', function() {
        expect(function() {
            new Murray(-5);
        }).toThrowError(RangeError, 'Invalid murray length');
    });
});
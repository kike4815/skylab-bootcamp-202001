if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

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

    it('should instantiate a Murray with length 1 when single non-integer value in arguments', function() {
        var murray = new Murray('a');

        expect(murray).toBeInstanceOf(Murray);
        expect(murray.length).toBe(1);
        expect(murray[0]).toBe('a');
    });

    it('should fail when single value in arguments is numberic but not integer', function() {
        expect(function() {
            new Murray(1.1);
        }).toThrowError(RangeError, 'Invalid murray length');
    });
});
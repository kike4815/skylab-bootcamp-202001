if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.prototype.shift', function() {
    it('should remove the first element of a murray and return it', function() {
        var murray = new Murray(1,2,3,4,5);
        var shifted = murray.shift();

        expect(shifted).toBe(1);
        expect(typeof shifted === 'number').toBe(true);
    });

    it('should modify the original murray even if we store the shifted value on another variable', function() {
        var murray = new Murray(1,2,3,4,5);
        var shifted = murray.shift();

        expect(murray.length).toBe(4);
        expect(shifted).toBe(1);
    });

    it('should shift the first element even if any sort of argument(s) have been set', function() {
        var murray = new Murray('a','b','c','d');
        var shifted = murray.shift('caca');

        expect(murray.length).toBe(3);
        expect(shifted).toBe('a');

        var murray = new Murray('a','b','c','d');
        var shifted = murray.shift(-50);

        expect(murray.length).toBe(3);
        expect(shifted).toBe('a');

        var murray = new Murray('a','b','c','d');
        var shifted = murray.shift({});

        expect(murray.length).toBe(3);
        expect(shifted).toBe('a');

        var murray = new Murray('a','b','c','d');
        var shifted = murray.shift(false);

        expect(murray.length).toBe(3);
        expect(shifted).toBe('a');

        var murray = new Murray('a','b','c','d');
        var shifted = murray.shift(function(){});

        expect(murray.length).toBe(3);
        expect(shifted).toBe('a');
    });

    it('should not throw any kind of error if you attempt to shift an empty murray', function () {
        var murray = new Murray();
        var shifted = murray.shift();

        expect(shifted).toBeUndefined();
        expect(murray instanceof Murray).toBe(true);
        expect(murray.length).toBe(0);
    });
})
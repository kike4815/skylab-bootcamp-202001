if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe("Murray.prototype.concat", function() {
    it('should concatenate the murray with the murray specified on the argument', function() {
        var murray = new Murray(1,2,3,4,5);
        var murray2 = new Murray('a','b','c');
        var conc = murray.concat(murray2);

        expect(conc.length).toBe(murray.length+murray2.length);
    });

    it('should concatenate even if the argument is an instance of an array or a murray', function () {
        var murray = new Murray(1,2,3,4,5);
        var murray2 = [6,7,8,9,10];
        var conc = murray.concat(murray2);

        expect(conc.length).toBe(10);
        expect(typeof conc[6] === 'number').toBe(true);
    });

    it('should not modify the former murray nor the concatenated one', function() {
        var murray = new Murray('a','b','c','d');
        var murray2 = new Murray(1,2,3,4);
        var copy = new Murray('a','b','c','d');
        var copy2 = new Murray(1,2,3,4);
        var conc = murray.concat(murray2);

        expect(conc.length).toBe(murray.length+murray2.length);
        murray.forEach(function(value, index) { expect(value).toBe(copy[index]) });
        murray2.forEach(function(value, index) { expect(value).toBe(copy2[index]) });
    });

    it('should allow to concatenate any value type, not only murrays or arrays', function() {
        var murray = new Murray(1,2,3);
        var conc = murray.concat('oso');

        expect(conc.length).toBe(4);
        expect(conc[conc.length-1]).toBe('oso');

        var murray2 = new Murray(1,2,3);
        var conc2 = murray2.concat(50);

        expect(conc2.length).toBe(4);
        expect(conc2[conc2.length-1]).toBe(50);

        var murray3 = new Murray(1,2,3);
        var conc3 = murray3.concat(function(){});

        expect(conc3.length).toBe(4);
        expect(typeof conc3[conc3.length-1] === 'function').toBe(true);
    });

    it('should allow for any number of arguments, which will all be concatenated in order', function() {
        var murray = new Murray(1,2,3);
        var conc = murray.concat(-50, [1,2,3], function(){}, 'oso', false);

        expect(conc.length).toBe(10);
        expect(conc[4]).toBe(1);
        expect(typeof conc[conc.length-1] === 'boolean').toBe(true);
    });
})
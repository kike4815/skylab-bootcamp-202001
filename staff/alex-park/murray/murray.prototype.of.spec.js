if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.of', function () {
    it('should create a new Murray with whatever arguments you set', function () {
        var murray = Murray.of(1,2,3);

        expect(murray instanceof Murray).toBe(true);
        murray.forEach(function(value, index) { expect(value).toBe(++index) });
    });

    it('should create a new Murray regardless of the value type of the arguments', function () {
        var murray = Murray.of(true, -50, 'oso', {}, function(){});

        expect(murray instanceof Murray).toBe(true);
        expect(murray.length).toBe(5);
        expect(typeof murray[murray.length-1] === 'function').toBe(true);
    });

    it('should still create an instance of murray when only one positive integer argument is set (unlike the usual construction)', function () {
        var murray = Murray.of(50);

        expect(murray instanceof Murray).toBe(true);
        expect(murray.length).toBe(1);
        expect(murray[0]).toBe(50);
    });

    it('should still create an instance of murray even when no arguments have been set', function () {
        var murray = Murray.of();

        expect(murray instanceof Murray).toBe(true);
        expect(murray.length).toBe(0);
    });
})
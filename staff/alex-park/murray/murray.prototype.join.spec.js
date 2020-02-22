if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.protptype.join', function() {
    it('should return a string of all murray elements separated by the desired separator specified as an argument', function () {
        var murray = new Murray(1,2,3,4,5);
        var str = murray.join('*');

        expect(typeof str === 'string').toBe(true);
        expect(str).toBe('1*2*3*4*5');

        var _murray = new Murray('a','b','c','d','e');
        var _str = _murray.join('-');

        expect(typeof _str === 'string').toBe(true);
        expect(_str).toBe('a-b-c-d-e');
    });

    it('should not modify the original murray', function() {
        var murray = new Murray(1,2,3,4,5);
        var copy = new Murray(1,2,3,4,5);
        murray.join('caca');

        murray.forEach(function(value, index) { expect(value).toBe(copy[index]) });
    });

    it('should stringify the murray regardless of the separator type', function () {
        var murray = new Murray(1,2,3,4,5);
        var str = murray.join(function(){});

        expect(typeof str === 'string').toBe(true);
        expect(str).toBe("1function(){}2function(){}3function(){}4function(){}5");
    });

    it('should work even when a second argument has been accidentally set', function() {
        var murray = new Murray(1,2,3,4,5);
        var str = murray.join('---', 'pedo');

        expect(str).toBe('1---2---3---4---5');
    });
})
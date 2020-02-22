if (typeof require !== 'undefined')
    var Murray = require('./murray')

describe('Murray.prototype.reverse', function() {
    it('should modify the original murray by reversing all its values', function() {
        var murray = new Murray(1,2,3,4,5);
        var copy = new Murray(1,2,3,4,5);
        murray.reverse();

        murray.forEach(function(value, index) { expect(value).toBe(copy[copy.length-index-1]) });
    });

    it('should reverse the values regardless of their nature', function() {
        var murray = new Murray(1,false,'oso',undefined);
        var copy = new Murray(1,false,'oso',undefined);
        murray.reverse();

        murray.forEach(function(value, index) { expect(value).toBe(copy[copy.length-index-1]) });

        var _murray = new Murray(1,false,'oso',undefined,function(){}, [1,2,3]);
        _murray.reverse();

        expect(typeof _murray[1] === 'function').toBe(true);
        expect(_murray[0] instanceof Array).toBe(true);
    });

    it('should reverse the values even if arguments have been accidentally placed', function() {
        var murray = new Murray(1,2,3,4,5);
        var copy = new Murray(1,2,3,4,5);
        murray.reverse('patata');

        murray.forEach(function(value, index) { expect(value).toBe(copy[copy.length-index-1]) });

        var _murray = new Murray(1,2,3,4,5);
        var _copy = new Murray(1,2,3,4,5);
        _murray.reverse('patata', false, function(){});

        _murray.forEach(function(value, index) { expect(value).toBe(_copy[_copy.length-index-1]) });
    });
})
if(typeof require !== 'undefined')
    var Murray = require("./murray")

describe('Murray.prototype.fill', function () {

    it('should modify the murray with an static value specified as a first argument', function() {
        var murray = new Murray(1,2,3,4,5);
        murray.fill('oso');

        expect(murray.length).toBe(5);
        murray.forEach(function(value) { expect(value).toBe('oso') });
    });

    it('has to modify the original murray', function () {
        var murray = new Murray(1,2,3,4,5);
        var copy = new Murray(1,2,3,4,5);
        murray.fill('sos');

        murray.forEach(function(value, index) { expect(value).not.toBe(copy[index]) });
    });

    it('should allow for a second argument specifying the starting point of the modification', function() {
        var murray = new Murray(10,20,30,40,50,60,70,80,90,100);
        murray.fill('oso', 5);

        expect(murray[5]).toBe('oso');
        expect(murray[4]).toBe(50);
    });

    it('should transform the start argument to an integer number if possible', function() {
        var murray = new Murray(1,2,3,4,5);
        murray.fill('oso', '2');

        expect(murray[2]).toBe('oso');
        expect(murray[1]).toBe(2);

        var _murray = new Murray(1,2,3,4,5);
        _murray.fill('sos', true);

        expect(_murray[1]).toBe('sos');
    });

    it('should set the start to 0 as default, if the start argument could not be transformed into an integer number', function () {
        var murray = new Murray(1,2,3,4,5);
        murray.fill('oso', function(){});
        murray.forEach(function(value) { expect(value).toBe('oso') });

        var _murray = new Murray(1,2,3,4,5);
        _murray.fill('oso', []);
        _murray.forEach(function(value) { expect(value).toBe('oso') });
    });

    it('should allow for a third argument to set the end of the fill', function() {
        var murray = new Murray(0,10,20,30,40,50,60,70,80,90,100);
        murray.fill('sos', 3, 5);

        expect(murray[2]).toBe(20);
        expect(murray[3]).toBe('sos');
        expect(murray[murray.length-1]).toBe(100);
    });

    it('should transform the end argument to an integer number if possible', function() {
        var murray = new Murray(1,2,3,4,5,6,7,8,9);
        murray.fill('oso', '2', '5');

        expect(murray[2]).toBe('oso');
        expect(murray[1]).toBe(2);
        expect(murray[4]).toBe('oso');
    });

    it('should set the end value to the murrays length as default, if the argument cannot be transformed into an integer number', function() {
        var murray = new Murray(1,2,3,4,5,6,7,8,9,10);

        murray.fill('oso', function(){}, function(){});
        murray.forEach(function(value) { expect(value).toBe('oso') });

        var _murray = new Murray(1,2,3,4,5);
        
        _murray.fill('oso', [], []);
        _murray.forEach(function(value) { expect(value).toBe('oso') });
    });
})
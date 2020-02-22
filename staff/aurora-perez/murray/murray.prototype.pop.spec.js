if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe ('Murray.prototype.pop', function () {
    it('it should return the same murray with the last value substracted', function(){
        var murray = new Murray (1, 2, 4);
        var a = murray.pop();

        expect(murray.length).toBe(2);
        expect(a).toBe(4);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
    })

    it('should return undefined when the murray is empty', function () {
        var murray = new Murray ();
        var a = murray.pop();
        expect(a).toBeUndefined();
    })

    it('should delete the last element of the murray regardless of the argument', function (){
        var murray = new Murray (1, 2, 3, 4, 5);

        murray.pop('a')
        expect(murray.length).toBe(4);

        var murray2 = new Murray (1, 2, 3, 4, 5);
        murray2.pop('a');
        expect(murray2.length).toBe(4);

        var murray3 = new Murray (1, 2, 3, 4, 5);
        murray3.pop(true);
        expect(murray3.length).toBe(4);

        var murray4 = new Murray (1, 2, 3, 4, 5);
        murray4.pop(function(){});
        expect(murray4.length).toBe(4);
    })
})
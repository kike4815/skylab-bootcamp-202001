if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe ('SHIFT', function(){
    it ('should removes the first element from an murray and returns that removed element.', function(){
        var murray = new Murray (1, 2, 3, 4, 5);
        var result = murray.shift();
        expect(result).toBe(1);

        var murray2 =  new Murray ('hola', 3, 4, 5);
        var result2 = murray2.shift();
        expect(result2).toBe('hola');
    })

    it('should method changes the length of the murray.', function(){
        var murray = new Murray (1, 2, 3, 4);
        murray.shift();
        expect(murray.length).toBe(3);
        expect(murray[0]).toBe = 2;
        expect(murray[1]).toBe = 3;
        expect(murray[2]).toBe = 4;

        var murray2 = new Murray ('a', 'b', 'c');
        murray2.shift();
        expect(murray2.length).toBe(2);
        expect(murray2[0]).toBe = 'b';
        expect(murray2[1]).toBe = 'c';
    })

    it ('should workd in spite of the murray is empty', function (){
        var murray = new Murray ();
        var result = murray.shift();

        expect(result).toBeUndefined();
        expect(murray.length).toBe(0);
        expect(murray instanceof Murray).toBe(true);

    })

    it('should still works un spite of there are arguments', function(){
        var murray = new Murray (1, 2, 3, 4);
        result = murray.shift(1);

        expect(result).toBe(1);
        expect(murray.length).toBe(3);
        expect(murray[0]).toBe = 2;
        expect(murray[1]).toBe = 3;
        expect(murray[2]).toBe = 4;

    })

})

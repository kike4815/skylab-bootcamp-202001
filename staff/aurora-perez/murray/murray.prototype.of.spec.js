if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe ('murray.of', function(){
    it('it creates a new murray from a variable number of arguments.', function(){
        var murray = Murray.of(1, 2, 3);

        expect(murray.length).toBe(3);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);

    })

    it('should creates a new murray from a fariable number of arguments, regardless of type of the arguments', function(){
        var murray = Murray.of(true, 'a', 1);

        expect(murray.length).toBe(3);
        expect(murray[0]).toBe(true);
        expect(murray[1]).toBe('a');
        expect(murray[2]).toBe(1);
    })

    it ('it creates an empty murray if the number of arguments is 0', function() {
        var murray = Murray.of();
        
        expect(murray.length).toBe(0);
        expect(murray[0]).toBeUndefined();
    })

    it('should create a murray with one integer number argument, and the murray will have only element', function() {
        var murray = Murray.of(40);

        expect(murray.length).toBe(1);
        expect(murray[0]).toBe(40);
    })
})
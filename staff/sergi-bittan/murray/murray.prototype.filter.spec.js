
if (typeof require !== "undefined")
var Murray = require ("./murray")

describe("Murray.prototype.filter", function(){
    it("should return a new murray with all the numbers within the existing murray than are > 18", function(){
        var murray = new Murray(10, 13, 56, 34, 57, 22);
        var result = murray.filter(function(elem){return elem > 18});
        expect(result.length).toBe(4);
    });
    it("verifies all the worlds with the letter 'o'", function(){
        var murray = new Murray("abc", "hola", "mundo", "hello");
        var result = murray.filter(function(elem){return elem.indexOf("o") > -1});
        expect(result.length).toBe(3);
    })
    it("Should fail on non-function expression", function(){
        expect(function(){
            new Murray("abc", "hola", "mundo", "hello").filter(true);
        }).toThrowError(TypeError, "true is not a function");
        expect(function(){
            new Murray("abc", "hola", "mundo", "hello").filter();
        }).toThrowError(TypeError, "undefined is not a function");
        expect(function(){
            new Murray("abc", "hola", "mundo", "hello").filter(1);
        }).toThrowError(TypeError, "1 is not a function")
        expect(function(){
            new Murray("abc", "hola", "mundo", "hello").filter(null);
        }).toThrowError(TypeError, "null is not a function")
    })
})




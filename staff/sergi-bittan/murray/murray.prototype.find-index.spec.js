if (typeof require !=="undefined")
var Murray = require ("./murray")

describe("Murray.prototype.findIndex", function(){
    it("Should return de index of specific element", function(){
        var murray = new Murray(3 ,5, 8, 3, 2);
        var result = murray.findIndex(function (elem){return elem === 8});
        expect(result).toBe(2);
    })
    it("If the search element is not in the murray should return -1", function(){
        var murray = new Murray(3 ,5 ,8, 3, 2);
        var result = murray.findIndex(function(elem){return elem == 1});
        expect(result).toBe(-1);
    })
    it("If we find a duplied element in murray it should only return the index of the first one", function(){
        var murray = new Murray(5, 4, 6, 9, 9);
        var result = murray.findIndex(function(elem){
            return elem == 9});
            expect(result).toBe(3);
    });
    it("if we find a undefined element should return de index of element", function(){
        var murray = new Murray(5, 4, 6, 9, undefined);
        var result = murray.findIndex(function(elem){return elem === undefined});
        expect(result).toBe(4);                                                                        
    });
    it("Should fail in non-function expression", function(){
        expect(function(){
        new Murray(1, 5, 2).findIndex();
        }).toThrowError(TypeError, "undefined is not a function");

        expect(function(){
            new Murray(1, 5, 2).findIndex(1);
        }).toThrowError(TypeError, "1 is not a function");

        expect(function(){
            new Murray(1, 5, 2).findIndex(true);
        }).toThrowError(TypeError, "true is not a function");

    })
})
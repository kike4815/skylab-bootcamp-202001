if (typeof require !== "undefined")
var Murray = require("./murray")

describe("Murray.prototype.shift", function(){
    it("Should return the first element of the murray", function(){
        var murray = new Murray(1, 5, 4, 5, 7);
        var result = murray.shift();
        expect(result).toBe(1);
    });
    it("the first element of the murray should be", function(){
        var murray = new Murray(1, 5, 4, 5, 7);
        var result = murray.shift();
        expect(murray[1]).toBe(4);
        //expect(murray.length).toBe(4);
        //expect(murray[murray.length]).toBe(7)
    });
    it("The length of murray should be modified deducting 1", function(){
        var murray = new Murray(1, 5, 4, 5, 7);
        var result = murray.shift();
        expect(murray.length).toBe(4);;
    });
    it("The last element of the new murray should be 7", function(){
        var murray = new Murray(1, 5, 4, 5, 7);
        var result = murray.shift();
        expect(murray[0]).toBe(5);
    });
})
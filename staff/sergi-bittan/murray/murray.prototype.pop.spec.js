if (typeof require !== "undefined")
var Murray = require("./murray")

describe("Murray.prototype.pop",function(){
    it("Should murray [1,2,3] be modified and return 3", function() {
        var murray = new Murray(1,2,3);

        var result = murray.pop();
        
        expect(murray.length).toBe(2);
        expect(murray[2]).toBe(undefined)
        expect(result).toBe(3);
    });
    it("Should murray [] be return undefined", function(){
        var murray = new Murray(1,2,3);

        murray.pop();
        murray.pop();
        murray.pop();
        var result = murray.pop();

        expect(murray.length).toBe(0);
        expect(result).toBe(undefined);
    })
    
});


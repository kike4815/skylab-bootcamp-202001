if (typeof require !== "undefined")
var Murray = require("./murray")

describe("Murray.prototype.slice", function(){
    
    it("should return a new murray from an initial position", function(){
        var murray = new Murray(1, 3, 5, 6, 4);
        var newMurray = murray.slice(1);
        expect(newMurray[0]).toBe(murray[1]);
    });
    it("should return a new murray from an initial position to end position (end no included)", function(){
        var murray = new Murray(1, 3, 5, 6, 4);
        var newMurray = murray.slice(1,3);
        
        expect(newMurray[0]).toBe(3);
        expect(newMurray[1]).toBe(5);
        expect(newMurray.length).toBe(2);
    })
    it("Should return a new array if the first parameter is negative starting with the last murray position", function(){
        var murray = new Murray(1, 3, 5, 6, 4);
        var newMurray = murray.slice(-2);

        expect(newMurray.length).toBe(2);
        expect(newMurray[0]).toBe(6);
        expect(newMurray[1]).toBe(4);
    })
    it("Should return a new array from an initial position to end position if end position is negative", function(){
        var murray = new Murray(1, 3, 5, 6, 4);
        var newMurray = murray.slice(1, -2);

        expect(newMurray[1]).toBe(5);
        expect(newMurray.length).toBe(2);
        
    })
    it("should return a new array if both parameters are negative", function(){
        var murray = new Murray(1, 3, 5, 6, 4);
        var newMurray = murray.slice(-3,-2);

        expect(newMurray.length).toBe(1);
        expect(newMurray[0]).toBe(5);
        expect(newMurray[0]).toBe(murray[2]);
    })
})
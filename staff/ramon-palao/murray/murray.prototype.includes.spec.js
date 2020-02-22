if(typeof require !== "undefined") var Murray = require("./murray.prototype.constructor")

describe("Murray.prototype.includes", function(){
    it("should return true if murray includes the value passed as an argument", function(){
        var murray = new Murray(1, 2, 3, 4, 5);
        
        expect(murray.includes(2)).toBe(true);
    });

    it("should return false if murray does not include the value passed as an argument", function(){
        var murray = new Murray(1, 2, 3, 4, 5);

        expect(murray.includes(8)).toBe(false);
    });

    it("should return false if value argument is empty", function(){
        var murray = new Murray(1, 2, 3, 4, 5);

        expect(murray.includes()).toBe(false);
    });

    it("should search the element after the start number, if it is designed", function(){
        var murray = new Murray("cat", "dog", "dolphin", "lion", "turtle");

        expect(murray.includes("dolphin", 1)).toBe(true);
        expect(murray.includes("dolphin", 3)).toBe(false);
    });

    it("should return false if the start parameter is bigger than murray's length", function(){
        var murray = new Murray("cat", "dog", "dolphin", "lion", "turtle");

        expect(murray.includes("lion", murray.length +1)).toBe(false);
    });

    it("should the start index be the sum of murray's length and the start if the start index is negative", function(){
        var murray = new Murray("cat", "dog", "dolphin", "lion", "turtle");

        expect(murray.includes("lion", -1)).toBe(false);
        expect(murray.includes("lion", -3)).toBe(true);
        expect(murray.length + -5).toBe(0);
    });

    it("should return true if the element is within the murray eventhough the start index is undefined or null", function(){
        var murray = new Murray("cat", "dog", "dolphin", "lion", "turtle");

        expect(murray.includes("dog", undefined)).toBe(true);
        expect(murray.includes("dog", null)).toBe(true);
    });
});
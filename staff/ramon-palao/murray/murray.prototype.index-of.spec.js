if(typeof require !== "undefined") var Murray = require("./murray.prototype.constructor")

describe("Murray.prototype.indexOf", function(){
    it("should return the position of the element if the element is within the murray", function(){
        var murray = new Murray("cat", "dog", "dolphin", "lion");

        expect(murray.indexOf("cat")).toBe(0);
        expect(murray.indexOf("dog")).toBe(1);
        expect(murray.indexOf("dolphin")).toBe(2);
        expect(murray.indexOf("lion")).toBe(3);
    });

    it("should return the first index of an element if this element is repeated within the murray", function(){
        var murray = new Murray("cat", "dog", "lion", "dolphin", "dog");

        expect(murray.indexOf("dog")).toBe(1);
    });

    it("should return '-1' if the element is not within the murray", function(){
        var murray = new Murray("cat", "dog", "dolphin", "lion");

        expect(murray.indexOf("turtle")).toBe(-1);
    });

    it("should return '-1' if there is no value as an argument", function(){
        var murray = new Murray("cat", "dog", "dolphin", "lion");

        expect(murray.indexOf()).toBe(-1);
    });

    it("should return '-1' if start index is bigger than murray's length", function(){
        var murray = new Murray("cat", "dog", "dolphin", "lion");

        expect(murray.indexOf("lion", murray.length +1)).toBe(-1);
    });

    it("should return '-1' if start index is equal to murray's length", function(){
        var murray = new Murray("cat", "dog", "dolphin", "lion");

        expect(murray.indexOf("lion", murray.length)).toBe(-1);
    });

    it("should return the element's index eventhough start index is negative", function(){
        var murray = new Murray("cat", "dog", "dolphin", "lion");

        expect(murray.indexOf("dolphin", -5)).toBe(2);
    });
});
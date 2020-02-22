if(typeof require !== "undefined") var Murray = require("./murray.prototype.constructor")

describe("Murray.prototype.some", function(){
    it("should return true if an element matches the expression", function(){
        var murray = new Murray(10, 2, 15, 24, 8);
        var result = murray.some(function(value){ return value > 20});

        expect(result).toBe(true);
        expect(murray).toBeInstanceOf(Murray);
    });

    it("should return false if there are no elements in murray matching the expression", function(){
        var murray = new Murray(10, 2, 15, 24, 8);
        var result = murray.some(function(value){ return value > 25});

        expect(murray).toBeInstanceOf(Murray);
        expect(result).toBe(false);
    });

    it("should return false to any condition passed into an empty murray", function(){
        var murray = new Murray();
        var result = murray.some(function(value){ return value > 25});

        expect(murray).toBeInstanceOf(Murray);
        expect(result).toBe(false);
    });

    it("should fail if there are no callback", function(){
        var murray = new Murray(1, 2, 3);

        expect(function(){murray.some()}).toThrowError(TypeError, "undefined is not a function");
    });
})
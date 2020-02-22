if(typeof require !== "undefined") var Murray = require("./murray.prototype.constructor")

describe("Murray.prototype.join", function(){
    it("should type of result be a string", function(){
        var murray = new Murray("cat", "dog", "dolphin");
        var result = murray.join(" ");

        expect(typeof result).toBe("string");
    });

    it("should return an empty string if murray's length is 0", function(){
        var murray = new Murray;
        var result = murray.join(" ");

        expect(result).toBe("");
    });

    it("should the element returned be an empty string if this element is null in murray", function(){
        var murray = new Murray(1, 2, null, 4, 5);
        var result = murray.join();

        expect(result).toBe("1,2,,4,5");
    });

    it("should the element returned be an empty string if this element is undefined in murray", function(){
        var murray = new Murray(1, undefined, 3, 4, 5);
        var result = murray.join();

        expect(result).toBe("1,,3,4,5");
    });

    it("should the resultant string have a comma between the elements if there is no argument within the method", function(){
        var murray = new Murray(1, 2, 3, 4, 5);
        var result = murray.join();

        expect(result).toBe("1,2,3,4,5");
    });

    it("should fail is the method is called on non-Murray instance", function(){

        expect(function(){
            "hello".join();
        }).toThrowError(TypeError, '"hello".join is not a function');
    });

})
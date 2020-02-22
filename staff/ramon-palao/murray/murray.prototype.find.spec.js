if(typeof require !== "undefined") var Murray = require("./murray.prototype.constructor")

describe("Murray.prototype.find", function(){
    it("should return the first element of murray that matches the expression", function(){
        var murray = new Murray(3, 4, 14, 19);
        var found = murray.find(function(value){return value > 11});
        var foundTwo = murray.find(function(value){return value < 6});

        expect(found).toBe(14);
        expect(foundTwo).toBe(3);
    });

    it("should return undefined if there are no elements matching the expression", function(){
        var murray = new Murray(3, 4, 14, 19);
        var found = murray.find(function(value){return value > 20});

        expect(found).toBeUndefined();
    });

    it("should the original murray not to be modified after calling find()", function(){
        var murray = new Murray(3, 4, 14, 19);
        murray.find(function(value){return value > 11});

        expect(murray.length).toBe(4);
        expect(murray[0]).toBe(3);
        expect(murray[1]).toBe(4);
        expect(murray[2]).toBe(14);
        expect(murray[3]).toBe(19);
    });

    it("should does not find none of those elements added to murray after call find()", function(){
        var murray = new Murray(3, 4, 14, 19);
        var found = murray.find(function(value){return value > 10});

        expect(murray.length).toBe(4);
        expect(found).toBe(14);

        murray[murray.length] = 34;
        ++murray.length;
        murray[murray.length] = 29;
        ++murray.length;

        expect(murray.length).toBe(6);
        expect(found).toBe(14);
    });

    it("should fail if the argument passed is not a function", function(){
        var murray = new Murray(3, 4, 14, 19);

        expect(function(){
            murray.find("hello");
        }).toThrowError(TypeError, "hello is not a function");

        expect(function(){
            murray.find();
        }).toThrowError(TypeError, "undefined is not a function");

        expect(function(){
            murray.find(true);
        }).toThrowError(TypeError, "true is not a function");
    });

    it("should fail if find() is called on a non-Murray object", function(){
        
        expect(function(){
            "hello".find(function(value){return value === "o"});
        }).toThrowError(TypeError, '"hello".find is not a function');
    });
});
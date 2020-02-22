if(typeof require !== "undefined") var Murray = require("./murray.prototype.constructor")

describe("Murray.prototype.filter", function(){
    it("should the original murray not to be modified", function(){
        var murray = new Murray(20, 12, 6, 8);
        var filtered = murray.filter(function(value){return value > 10});

        expect(murray.length).toBe(4);
        expect(murray[0]).toBe(20);
        expect(murray[1]).toBe(12);
        expect(murray[2]).toBe(6);
        expect(murray[3]).toBe(8);
    });

    it("should filter all the elements bigger than 10 and store them into a new murray", function(){
        var murray = new Murray(20, 12, 6, 8);
        var filtered = murray.filter(function(value){return value > 10});

        expect(filtered[0]).toBe(20);
        expect(filtered[1]).toBe(12);
    });

    it("should the filtered murray have a length of 2", function(){
        var murray = new Murray(20, 12, 6, 8);
        var filtered = murray.filter(function(value){return value > 10});

        expect(filtered.length).toBe(2);
    });

    it("should return an empty murray if none of the elements from murray matches the expression", function(){
        var murray = new Murray(2, 1, 6, 8);
        var filtered = murray.filter(function(value){return value > 10});

        expect(filtered.length).toBe(0);
    });

    it("should does not filter all those elements added to murray after call filter()", function(){
        var murray = new Murray(20, 12, 6, 8);
        var filtered = murray.filter(function(value){return value > 10});

        expect(murray.length).toBe(4);
        expect(filtered.length).toBe(2);

        murray[murray.length] = 34;
        ++murray.length;
        murray[murray.length] = 29;
        ++murray.length;

        expect(murray.length).toBe(6);
        expect(filtered.length).toBe(2);
    });

    it("should fail if the argument passed is not a function", function(){
        var murray = new Murray(20, 12, 6, 8);

        expect(function(){
            murray.filter("hello");
        }).toThrowError(TypeError, "hello is not a function");
    });

    it("should fail is filter() is called on a non-Murray object", function(){

        expect(function(){
            'hello'.filter(function(value){return value.length > 4});
        }).toThrowError(TypeError, '"hello".filter is not a function');
    });
})
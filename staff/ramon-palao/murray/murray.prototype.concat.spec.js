if(typeof require !== "undefined") var Murray = require("./murray.prototype.constructor")

describe("Murray.prototype.concat", function(){
    it("should murrayOne and murrayTwo not to be modified after using the method", function(){
        var murrayOne = new Murray(1, 2, 3);
        var murrayTwo = new Murray(4, 5, 6);
        var murrayConcat = murrayOne.concat(murrayTwo);

        expect(murrayConcat).not.toBe(murrayOne);
        expect(murrayConcat).not.toBe(murrayTwo);
        expect(murrayOne[0]).toBe(1);
        expect(murrayOne[1]).toBe(2);
        expect(murrayOne[2]).toBe(3);
        expect(murrayTwo[0]).toBe(4);
        expect(murrayTwo[1]).toBe(5);
        expect(murrayTwo[2]).toBe(6);
    });

    it("should murrayConcat length be the sum of murrayOne length plus murrayTwo length", function(){
        var murrayOne = new Murray(1, 2, 3);
        var murrayTwo = new Murray(4, 5, 6);
        var murrayConcat = murrayOne.concat(murrayTwo);

        expect(murrayConcat.length).toBe(murrayOne.length + murrayTwo.length);
    });

    it("should murrayConcat be one Murray within murrayOne and murrayTwo united", function(){
        var murrayOne = new Murray(1, 2, 3);
        var murrayTwo = new Murray(4, 5, 6);
        var murrayConcat = murrayOne.concat(murrayTwo);

        expect(murrayConcat[0]).toBe(1);
        expect(murrayConcat[1]).toBe(2);
        expect(murrayConcat[2]).toBe(3);
        expect(murrayConcat[3]).toBe(4);
        expect(murrayConcat[4]).toBe(5);
        expect(murrayConcat[5]).toBe(6);

    });

    it("should murrayConcat be an instance of Murray", function(){
        var murrayOne = new Murray(1, 2, 3);
        var murrayTwo = new Murray(4, 5, 6);
        var murrayConcat = murrayOne.concat(murrayTwo);

        expect(murrayConcat).toBeInstanceOf(Murray);
    });

    it("should instance of Murray be concatenated to strings, numbers or booleans", function(){
        var murrayOne = new Murray(1, 2, 3);
        var murrayString = murrayOne.concat("hello");
        var murrayBoolean = murrayOne.concat(true);
        var murrayNumber = murrayOne.concat(19);

        expect(murrayString[3]).toBe("hello");
        expect(murrayBoolean[3]).toBe(true);
        expect(murrayNumber[3]).toBe(19);
    });

    it("should instance of Murray be concatenated to undefined", function(){
        var murrayOne = new Murray(1, 2, 3);
        var murrayUndefined = murrayOne.concat(undefined);

        expect(murrayUndefined[3]).toBe(undefined);
    });

    it("should return the object which calls the method if there are no parameters within the method", function(){
        var murrayOne = new Murray(1, 2, 3);
        var murrayConcat = murrayOne.concat();
        
        expect(murrayConcat.length).toBe(murrayOne.length);
        expect(murrayConcat[0]).toBe(murrayOne[0]);
        expect(murrayConcat[1]).toBe(murrayOne[1]);
        expect(murrayConcat[2]).toBe(murrayOne[2]);
    });

    it("should fail if undefined is concatenated to an instance of Murray", function(){
        var murrayOne = new Murray(1, 2, 3);

        expect(function(){undefined.concat(murrayOne)}).toThrowError(TypeError, "Cannot read property 'concat' of undefined");
    });

    it("should fail if a boolean is concatenated to an instance of Murray", function(){
        var murrayOne = new Murray(1, 2, 3);

        expect(function(){true.concat(murrayOne)}).toThrowError(TypeError, "true.concat is not a function");
    });
});
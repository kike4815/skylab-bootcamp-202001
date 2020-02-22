if(typeof require !== "undefined") var Murray = require("./murray.prototype.constructor")

describe("Murray.prototype.pop", function(){
    it("should the last element of newMurray be deleted", function(){
        var newMurray = new Murray(1, 2, 3, 4);
        newMurray.pop();

        expect(newMurray[3]).toBeUndefined();
    });

    it("should newMurray's length be modified", function(){
        var newMurray = new Murray(1, 2, 3, 4);

        expect(newMurray.length).toBe(4);
        newMurray.pop();
        expect(newMurray.length).toBe(3);
    });

    it("should returned the deleted element", function(){
        var newMurray = new Murray(1, 2, 3, 4);
        var deletedElement = newMurray.pop();

        expect(deletedElement).toBe(4);
    });

    it("should deletedElement return 'undefined' if newMurray is empty", function(){
        var newMurray = new Murray;
        var deletedElement = newMurray.pop();

        expect(deletedElement).toBe(undefined);
    });

    it("should the method behave on the same way even though a value is passed as an argument", function(){
        var newMurray = new Murray (1, 2, 3, 4, 5, 6, 7);
        var deletedOne = newMurray.pop(23);
        var deletedTwo = newMurray.pop(false);
        var deletedThree = newMurray.pop("hello");

        expect(deletedOne).toBe(7);
        expect(deletedTwo).toBe(6);
        expect(deletedThree).toBe(5);
    });
})
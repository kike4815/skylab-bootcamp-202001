if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe('Murray.prototype.forEach', function () {
    it('should murray [1, 2, 3] be modified adding 10 to each value', function () {
        //a = 10
        var murray = new Murray(1, 2, 3);

        murray.forEach(function (value, index) {
            murray[index] = value + 10;
        }); // HAPPY path :)

        expect(murray.length).toBe(3);

        for (var i = 0; i < murray.length; i++)
            expect(murray[i]).toBe(i + 1 + 10);
    });

    it('should each value of murray [1, 2, 3] be added 10 and stored in results murray', function () {
        var murray = new Murray(1, 2, 3);
        var results = [];

        murray.forEach(function (value, index) { results[index] = value + 10 });

        expect(murray.length).toBe(3);

        for (var i = 0; i < murray.length; i++)
            expect(murray[i]).toBe(i + 1);

        results.forEach(function (result, index) {
            expect(result).toBe(murray[index] + 10);
        });
    });

    it('should fail on non-function expression', function () {
        expect(function () {
            new Murray(1, 2, 3).forEach(); // UNHAPPY path :(
        }).toThrowError(TypeError, 'undefined is not a function');

        expect(function () {
            new Murray(1, 2, 3).forEach(true);
        }).toThrowError(TypeError, 'true is not a function');

        // TODO refactor following unhappy cases to expect

        expect(function () {
            new Murray(1, 2, 3).forEach(1);
        }).toThrowError(TypeError, '1 is not a function');
    });
});
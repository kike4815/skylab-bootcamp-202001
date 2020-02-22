if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototoype.splice', function () {
    it('should insert a single value at index when count is 0', function () {
        var months = new Murray('Jan', 'March', 'April', 'June');

        months.splice(1, 0, 'Feb');

        expect(months.length).toBe(5);

        ['Jan', 'Feb', 'March', 'April', 'June'].forEach(function (value, index) {
            expect(months[index]).toBe(value);
        });
    });

    it('should replace a single value at index with value when count is 1', function () {
        var months = new Murray('Jan', 'March', 'April', 'June');

        months.splice(1, 1, 'Feb');

        expect(months.length).toBe(4);

        ['Jan', 'Feb', 'April', 'June'].forEach(function (value, index) {
            expect(months[index]).toBe(value);
        });
    });

    it('should replace multiple values with value from index when count is greater than 1', function () {
        var months = new Murray('Jan', 'March', 'April', 'June');

        months.splice(2, 2, 'Feb');

        expect(months.length).toBe(3);

        ['Jan', 'March', 'Feb'].forEach(function (value, index) {
            expect(months[index]).toBe(value);
        });
    });

    it('should replace multiple values with value from index when count is greater than 1', function () {
        var months = new Murray('Jan', 'March', 'April', 'June');

        months.splice(2, 2, 'Feb', 'Oct');

        expect(months.length).toBe(4);

        ['Jan', 'March', 'Feb', 'Oct'].forEach(function (value, index) {
            expect(months[index]).toBe(value);
        });
    });
});
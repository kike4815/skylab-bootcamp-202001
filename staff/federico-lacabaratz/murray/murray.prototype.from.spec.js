if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.from', function () {

    it('It should replicate the same murray', function () {
        var murray = new Murray(2, 3, 5, 78, 57, 32);

        var result = murray.from(murray);

        expect(result[0]).toBe(murray[0]);
        expect(result[1]).toBe(murray[1]);
        expect(result[2]).toBe(murray[2]);
        expect(result[3]).toBe(murray[3]);
        expect(result[4]).toBe(murray[4]);
        expect(result[5]).toBe(murray[5]);
    })

    it('It should fail on undefined or null murray', function () {
        expect(function (){
            var murray = new Murray;
            murray.from();
        }).toThrowError(TypeError, 'Cannot convert undefined or null to murray')
    });
});

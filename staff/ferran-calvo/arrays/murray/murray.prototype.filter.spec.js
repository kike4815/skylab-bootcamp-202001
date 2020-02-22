if (typeof require !== 'undefined'){
    var Murray = require('./murray')
}
describe('Murray.prototype.filter', function () {
    it('it should be the newest array should be the right condition',function(){
        var a = new Murray(1,2,3,4)
        var f = function(element){return element > 1}
        var result = a.filter(f)
        expect(result[0]).toBe(2)
        expect(result[1]).toBe(3)
        expect(result[2]).toBe(4)
        expect(result.length).toBe(3)
    })
    it('it should fail when the argument is not a function', function () {
        expect(function(){
            new Murray(1,2,3).filter(1);
        }).toThrowError(TypeError,'1 is not a function')
        });
    it('it should fail when the argument is not a function', function () {
            expect(function(){
                new Murray(1,2,3).filter('abc');
            }).toThrowError(TypeError,'abc is not a function')
    });
});
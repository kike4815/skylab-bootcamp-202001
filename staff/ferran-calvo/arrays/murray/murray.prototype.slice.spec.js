if (typeof require !== 'undefined'){
    var Murray = require('./murray')
}
describe('Murray.prototype.slice', function () {
    it('it should be return a new Murray with positive arguments',function(){
        var a = new Murray(1,2,3,4)
        var result = a.slice(1,3)
        expect(result[0]).toBe(2)
        expect(result[1]).toBe(3)
    })
    it('it should be return a new Murray with negative arguments',function(){
        var a = new Murray(1,2,3,4)
        var result = a.slice(-3,-1)
        expect(result[0]).toBe(2)
        expect(result[1]).toBe(3)
    })
    it('it should be return a new Murray with only a startIndex',function(){
        var a = new Murray(1,2,3,4)
        var result = a.slice(1)
        expect(result[0]).toBe(2)
        expect(result[1]).toBe(3)
        expect(result[2]).toBe(4)
    })
    it('it should fail when the argument is not a Number', function () {
        expect(function(){
            new Murray(1,2,3).slice('ab');
        }).toThrowError(TypeError,'ab arguments is not a number')
    });        
});
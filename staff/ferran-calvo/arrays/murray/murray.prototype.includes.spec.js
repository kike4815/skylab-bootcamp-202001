if (typeof require !== 'undefined'){
    var Murray = require('./murray')
}
describe('Murray.prototype.includes', function () {
    it('it should return true',function(){
        var a = new Murray(1,2,3,4)
        var result = a.includes(2)
        expect(result).toBe(true)
    })
    it('it should return false',function(){
        var a = new Murray(1,2,3,4)
        var result = a.includes(1,3)
        expect(result).toBe(false)
    })
    it('it should return false',function(){
        var a = new Murray(1,2,3,4)
        var result = a.includes(5)
        expect(result).toBe(false)
    })
    it('it should fail when indexFrom is not a Number', function () {
        expect(function(){
            new Murray(1,2,3).includes(1,'b');
        }).toThrowError(TypeError,'b is not a number')
    });         
});
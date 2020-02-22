if (typeof require !== 'undefined'){
    var Murray = require('./murray')
}
describe('Murray.prototype.fill', function () {
    it('it should be return a new Murray (1,2,0,0) with positive arguments',function(){
        var a = new Murray(1,2,3,4)
        var result = a.fill(0,2)
        expect(result[0]).toBe(1)
        expect(result[1]).toBe(2)
        expect(result[2]).toBe(0)
        expect(result[3]).toBe(0)
    })
    it('it should be return a new Murray (1,0,0,4) with negative arguments',function(){
        var a = new Murray(1,0,0,4)
        var result = a.fill(0,-3,-1)
        expect(result[0]).toBe(1)
        expect(result[1]).toBe(0)
        expect(result[2]).toBe(0)
        expect(result[3]).toBe(4)
    })
    it('it should fail when the argument is not a Number', function () {
        expect(function(){
            new Murray(1,2,3).fill(1, 'a', 3);
        }).toThrowError(TypeError,'a is not a number')
    });  
    it('it should fail when the argument is not a Number', function () {
        expect(function(){
            new Murray(1,2,3).fill(1, 2, 'b');
        }).toThrowError(TypeError,'b is not a number')
    });         
});
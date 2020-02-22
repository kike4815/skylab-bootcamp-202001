if (typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.every', function () {
    it("it should be false, all the elements don't pass the condition",function(){
        var a = new Murray(1,2,3,4)
        var f = function(element){return element > 1}
        var result = a.every(f)
        expect(result).toBe(false)
    })
    it('it should be true, all the elements pass the condition',function(){
        var a = new Murray(1,2,3,4)
        var f = function(element){return element > 0}
        var result = a.every(f)
        expect(result).toBe(true)
    })
    it('it should fail when the argument is not a function', function () {
        expect(function(){
            new Murray(1,2,3).every(1);
        }).toThrowError(TypeError,'1 is not a function')
        });
    it('it should fail when the argument is not a function', function () {
            expect(function(){
                new Murray(1,2,3).every('abc');
            }).toThrowError(TypeError,'abc is not a function')
    });
});
if (typeof require !== 'undefined'){
    var Murray = require('./murray')
}
describe('Murray.prototype.findIndex', function () {
    it('it should return 2',function(){
        var a = new Murray(1,2,3,4)
        var f= function(element){return element>2}
        var result = a.findIndex(f)
        expect(result).toBe(2)
    })
    it('it should return -1',function(){
        var a = new Murray(1,2,3,4)
        var f= function(element){return element>4}
        var result = a.findIndex(f)
        expect(result).toBe(-1)
    })
    it('it should fail when callback is not a function', function () {
        expect(function(){
            new Murray(1,2,3).findIndex(1);
        }).toThrowError(TypeError,'1 is not a function')
    });    
});
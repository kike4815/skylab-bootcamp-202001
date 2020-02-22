if (typeof require !== 'undefined'){
    var Murray = require('./murray')
}
describe('Murray.prototype.lastIndexOf', function () {
    it('it should return 3',function(){
        var a = new Murray(2,2,1,2,3,4);
        var result = a.lastIndexOf(2);
        expect(result).toBe(3);
    })
    it('it should return -1',function(){
        var a = new Murray(1,2,3,4);
        var result = a.lastIndexOf(0);
        expect(result).toBe(-1);
    })
});
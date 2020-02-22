if (typeof require !== 'undefined'){
    var Murray = require('./murray')
}
describe('Murray.prototype.reverse', function () {
    it("it should return a murray = (4,3,2,1)",function(){
        var a = new Murray(1,2,3,4);
        var result = a.reverse();
        expect(result[0]).toBe(4);
        expect(result[1]).toBe(3);
        expect(result[2]).toBe(2);
        expect(result[3]).toBe(1);
    })
    it('it should return a murray = ("d","c","b","a")',function(){
        var a = new Murray("a", "b", "c", "d");
        var result = a.reverse()
        expect(result[0]).toBe("d");
        expect(result[1]).toBe("c");
        expect(result[2]).toBe("b");
        expect(result[3]).toBe("a");
    })
});
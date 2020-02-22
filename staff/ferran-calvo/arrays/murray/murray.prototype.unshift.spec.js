if (typeof require !== 'undefined'){
    var Murray = require('./murray')
}
describe('Murray.prototype.unshift', function () {
    it('it should be return 4 and the murray changes to (1,2,3,4)',function(){
        var a = new Murray(3,4);
        var result = a.unshift(1,2);
        expect(a[0]).toBe(1);
        expect(a[1]).toBe(2);
        expect(a[2]).toBe(3);
        expect(a[3]).toBe(4);
        expect(result).toBe(4);
    })
    it('it should be return 4 and the murray changes to ("a","b","c","d")',function(){
        var a = new Murray("c","d");
        var result = a.unshift("a","b");
        expect(a[0]).toBe("a");
        expect(a[1]).toBe("b");
        expect(a[2]).toBe("c");
        expect(a[3]).toBe("d");
        expect(result).toBe(4);
    })
});
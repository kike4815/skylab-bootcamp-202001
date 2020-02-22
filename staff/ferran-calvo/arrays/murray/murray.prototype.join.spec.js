if (typeof require !== 'undefined'){
    var Murray = require('./murray')
}
describe('Murray.prototype.join', function () {
    it('it should return a string "1,2,3,4"',function(){
        var a = new Murray(1,2,3,4);
        var result = a.join();
        expect(result).toBe("1,2,3,4");
    })
    it('it should return a string "1 a 2 a 3 a 4"',function(){
        var a = new Murray(1,2,3,4);
        var result = a.join(" a ");
        expect(result).toBe("1 a 2 a 3 a 4");
    })
    it('it should return a string "1234"',function(){
        var a = new Murray(1,2,3,4);
        var result = a.join("");
        expect(result).toBe("1234");
    })
    it('it should fail when the argument is not a string', function () {
        expect(function(){
            new Murray(1,2,3).join([1,2,3]);
        }).toThrowError(TypeError,'1,2,3 should be a string');
        });
});
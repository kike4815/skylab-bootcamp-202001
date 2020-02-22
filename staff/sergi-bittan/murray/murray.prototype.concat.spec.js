if (typeof require !== 'undefined')
var Murray = require('./murray')

describe("Murray.prototype.concat",function(){
    it("Should return a new murray with murrays merged in it", function(){
        var murray1 = new Murray(1, 2, 3);
        var murray2 = new Murray(4, 5, 6, 7);
        var newMurray = murray1.concat(murray2);
        var compareMurray = new Murray(1,2,3,4,5,6,7);
    
        expect(newMurray.length).toBe(7);
        newMurray.forEach(function(value, index) { expect(value).toBe(compareMurray[index]) });
    })
    it("The originals murrays should be the same", function(){
        var murray1 = new Murray(1, 2, 3);
        var murray2 = new Murray(4, 5, 6, 7);
        var newMurray = murray1.concat(murray2);

        expect(murray1.length).toBe(3);
        expect(murray2.length).toBe(4);
        murray1.forEach(function(value, index){return expect(value).toBe(murray1[index])});
        murray2.forEach(function(value, index){return expect(value).toBe(murray2[index])});
    })
    it("Should return a empty murray if the origin murrays are empty", function(){
        var murray1 = new Murray();
        var murray2 = new Murray();
        var newMurray = murray1.concat(murray2);

        expect(newMurray.length).toBe(0);
    })
})
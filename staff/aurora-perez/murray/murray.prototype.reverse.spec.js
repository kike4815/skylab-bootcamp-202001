if(typeof require !== 'undefined')
    var Murray = require("./murray")


describe ('Murray.prototype.revserse', function () {
    it('should return a new murray with the reverted values', function(){
        var murray = new Murray (1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        murray.reverse();
        var murray2 = new Murray (10, 9, 8, 7, 6, 5, 4, 3, 2, 1);

        murray2.forEach(function(value, index){ expect(value).toBe(murray[index])})
    })

    it('should return a new murray with the reverted values even if the type', function(){
        var murray = new Murray ([1, 2, 3], ['a', 'b', 'c'], [7, 8, 9]);
        var result = murray.reverse();
        var murray2 = new Murray ([7, 8, 9],['a', 'b', 'c'], [1, 2, 3]);

        expect(result[0][0]).toBe(murray2[0][0]);
        expect(result[0][1]).toBe(murray2[0][1]);
        expect(result[0][2]).toBe(murray2[0][2]);
        expect(result[1][0]).toBe(murray2[1][0]);
        expect(result[1][1]).toBe(murray2[1][1]);
        expect(result[1][2]).toBe(murray2[1][2]);
        expect(result[2][0]).toBe(murray2[2][0]);
        expect(result[2][1]).toBe(murray2[2][1]);
        expect(result[2][2]).toBe(murray2[2][2]);
        
    })

    it('should return a new reverted murray, even if the type of arguments', function(){
        var murray = new Murray (1, 2, 3, 4);
        murray.reverse('hello');
        var murray2 = new Murray (4, 3, 2, 1);

        murray2.forEach(function(value, index){ expect(value).toBe(murray[index])})


        var murray_ = new Murray (1, 2, 3, 4);
        murray_.reverse(true)
        var hello = new Murray (4, 3, 2, 1);

        hello.forEach(function(value, index){ expect(value).toBe(murray_[index])})


    })
})


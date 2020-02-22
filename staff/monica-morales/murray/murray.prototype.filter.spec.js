if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.filter', function () {

    it('should show the result in a new murray', function () {
        var a = new Murray (4,2,8,3,9,14,5,62,3);
        var result = a.filter(function(value){return value > 5});
        
        expect(result).toBeInstanceOf(Murray);
    });

    it('should show the length of new Murray', function () {
        var a = new Murray (4,2,8,3,9,14,5,62,3);
        var result = a.filter(function(value){return value > 5})

        expect(result.length).toBe(4);
    });

    it('should show this result : {8,9,14,62}', function () {
        var a = new Murray (4,2,8,3,9,14,5,62,3);
        var result = a.filter(function(value){return value > 5})

        expect(result[0]).toBe(8);
        expect(result[1]).toBe(9);
        expect(result[2]).toBe(14);
        expect(result[3]).toBe(62);
    });

    it('should fail if expression is not a function', function () {
        expect(function (){
            var a = new Murray (4,2,8,3,9,14,5,62,3);
            var hello = 'hello world'
            a.filter(hello);
        }).toThrowError(TypeError, 'expression is not a function');
    });

    it('should fail on non-function expression', function () {
        expect(function (){
            var a = new Murray (4,2,8,3,9,14,5,62,3);
            a.filter();
        }).toThrowError(TypeError, 'It is necessary an expression');
    });
});
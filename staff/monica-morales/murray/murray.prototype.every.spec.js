if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.every', function () {

    it('should return a boolean "true"', function () {
        var a = new Murray(12,58,45,78,14,21,36);
        var result = a.every(function(value){
            return value > 10
        }); 

        expect(result).toBe(true);
    });

    it('should return a boolean "false"', function () {
        var a = new Murray(12,58,45,78,14,21,36);
        var result = a.every(function(value){
            return value < 10
        }); 

        expect(result).toBe(false);
    });

    it('should not modify the original murray', function () {
        var a = new Murray(12,58,45,78,14,21,36);
        a.every(function(value){
            return value < 10
        });

        expect(a.length).toBe(7);
        expect(a[0]).toBe(12);
        expect(a[1]).toBe(58);
        expect(a[2]).toBe(45);
        expect(a[3]).toBe(78);
        expect(a[4]).toBe(14);
        expect(a[5]).toBe(21);
        expect(a[6]).toBe(36);
    });

    it('should be a murray', function () {
        var a = new Murray(12,58,45,78,14,21,36);
        a.every(function(value){
            return value = 58
        });  
        
        expect(a).toBeInstanceOf(Murray);
    });

    it('should fail if expression is not a function', function () {
        expect(function (){
            var a = new Murray (4, 5, 'hello', true);
            var hello = 'hello'
            a.every(hello);
        }).toThrowError(TypeError, 'expression is not a function');
    });

    it('should fail on non-function expression', function () {
        expect(function (){
            var a = new Murray (4, 5, 'hello', true);
            a.every();
        }).toThrowError(TypeError, 'It is necessary an expression');
    });
});
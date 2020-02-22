if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.find', function () {

    it('should show the first result found', function () {
        var a = new Murray (1, 2,'hello', 5, 6);
        var result = a.find(function(value){
            if(typeof value === 'string'){
                return value;
            };
        });
        
        expect(result).toBe('hello');
    });

    it('should show "undefined" if it does not found results', function () {
        var a = new Murray (1, 2, 3, 5, 6);
        var result = a.find(function(value){
            if(typeof value === 'string'){
                return value;
            };
        });

        expect(result).toBe(undefined);
    });
    
    it('should be a murray', function () {
        var a = new Murray (1, 2, 3, 5, 6);
        a.filter(function(value){return value > 5});
        
        expect(a).toBeInstanceOf(Murray);
    });

    it('should fail if expression is not a function', function () {
        expect(function (){
            var a = new Murray (4, 5, 'hello', true);
            var hello = 'hello'
            a.find(hello);
        }).toThrowError(TypeError, 'expression is not a function');
    });

    it('should fail on non-function expression', function () {
        expect(function (){
            var a = new Murray (4, 5, 'hello', true);
            a.find();
        }).toThrowError(TypeError, 'It is necessary an expression');
    });
});
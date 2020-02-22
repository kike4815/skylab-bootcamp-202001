if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.map', function () {

    it('should show the same length that original murray', function () {
        var a = new Murray (1,2,3,4);
        var result = a.map(function(value){return value*2})

        expect(result.length).toBe(4);
    });

    it('should show the following result {2,4,6,8}', function () {
        var a = new Murray (1,2,3,4);
        var result = a.map(function(value){return value*2})

        expect(result[0]).toBe(2);
        expect(result[1]).toBe(4);
        expect(result[2]).toBe(6);
        expect(result[3]).toBe(8);
    });

    it('should show a result that was not boolean', function () {
        var a = new Murray(1,2,3,4);
        var result = a.map(function(value){return value*2})

        expect(typeof result !== 'boolean').toBe(typeof result === 'object');
    });


    it('should fail on non-function expression', function () {
        expect(function (){
            new Murray(1, 2, 3).map(); 
        }).toThrowError(TypeError, 'undefined is not a function');
    });
    
    it('should fail if expression is a boolean', function () {
        expect(function () {
        new Murray(1, 2, 3).map(true);
        }).toThrowError(TypeError, 'true is not a function');
    });


    it('should fail if expression is a string', function(){
        expect(function () {
        new Murray(1, 2, 3).map('Hello');
        }).toThrowError(TypeError, 'Hello is not a function');
    });
});
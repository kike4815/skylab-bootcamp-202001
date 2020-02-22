if (typeof require !== 'undefined')  var Murray = require('./murray');

describe('Murray.prototype.map',function(){
    
    it('Should transform [1, 5, 10, 15] into [2, 10, 20, 30]',function(){
        var murray = new Murray(1, 5, 10, 15);
        var result = murray.map(function(elem) {
            return elem * 2;
        });
        
        expect(result[0]).toBe(2);
        expect(result[1]).toBe(10);
        expect(result[2]).toBe(20);
        expect(result[3]).toBe(30);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(5);
        expect(murray[2]).toBe(10);
        expect(murray[3]).toBe(15);
        expect(result instanceof Murray).toBe(true);
    });
    
    it('should fail on non-function expression', function () {
        expect(function () {
            var murray = new Murray(1, 5, 10, 15)
            murray.map(); 
        }).toThrowError(TypeError, 'undefined is not a function');
        expect(function () {
            new Murray(1, 5, 10, 15).map(true);
        }).toThrowError(TypeError, 'true is not a function');
        
        expect(function () {
            new Murray(1, 5, 10, 15).map(1);
        }).toThrowError(TypeError, '1 is not a function');
    });
});
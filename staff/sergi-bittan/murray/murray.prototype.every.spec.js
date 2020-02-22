"use strict"
if (typeof require !== 'undefined')
    var Murray = require('./murray')
    
describe("Murray.prototype.every",function(){
    it("Should return true if all elements are true", function(){
        var murray = new Murray(1,4,6,7);

        var result = murray.every(function(elem){
            return elem > 0;
        });
        expect(result).toBe(true);
    });
    it("Should return false if one element is not true",function(){
        var murray = new Murray(1,4,6,7);

        var result = murray.every(function(elem){
            return elem < 6;
        });
        expect(result).toBe(false);
    })
    it("Should fail on non-function expression",function(){
        expect(function(){
            new Murray(1,4,6,7).every();
        }).toThrowError(TypeError, "undefined is not a function");
        expect(function(){
            new Murray(1,4,6,7).every(true);
        }).toThrowError(TypeError, "true is not a function");
        expect(function(){
            new Murray(1,4,6,7).every(1);
        }).toThrowError(TypeError, "1 is not a function");
    })
});
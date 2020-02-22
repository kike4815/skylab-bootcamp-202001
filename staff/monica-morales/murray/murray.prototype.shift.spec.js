if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.shift',function(){
    
    it('should remove the first element of a murray', function(){
        var murray = new Murray(1,2,3,4);
        var result = murray.shift();

        expect(result).toBe(1)
        expect(murray[0]).toBe(2);
        expect(murray[1]).toBe(3);
        expect(murray[2]).toBe(4);
    });
  
    it('should return the first element of a murray', function(){
        var a = new Murray('monica','laura','pepe','luis');
        var result = a.shift()

        expect(result).toBe('monica');
    });

    it('should modify the length of the original murray', function(){
        var a = new Murray('monica','laura','pepe','luis');
        var result = a.shift()
        
        expect(a.length).toBe(3);
        
    });

    it('Should return undefined if the length of murray is 0', function(){
        var a = new Murray();
        var result = a.shift()

        expect(result).toBe(undefined);
    });
});
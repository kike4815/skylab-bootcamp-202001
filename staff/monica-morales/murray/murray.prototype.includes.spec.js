if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.includes',function(){
    
    it('Should return a boolean', function(){
        var a = new Murray(1,2,3,4,5);
        var result = a.includes(2);
            
        expect(result).toBe(typeof result === 'boolean');
    });
  
    it('Should return true', function(){
        var a = new Murray(1,2,3,4,5);
        var result = a.includes(2);

        expect(result).toBe(true);
    });

    it('Should return false', function(){
        var a = new Murray(1,2,3,4,5);
        var result = a.includes('Hello');

        expect(result).toBe(false);
    });
});
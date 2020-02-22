if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.pop',function(){
    
    it('Should return the last position', function(){
        var murray = new Murray(1,2,3,4);
        var result = murray.pop();
    
        expect(result).toBe(4);
        expect(murray[0]).toBe(1);
        expect(murray[1]).toBe(2);
        expect(murray[2]).toBe(3);
    });
  
    it('Should return length of murray', function(){
       var murray = new Murray(1,2,3);
       murray.pop();

       expect(murray.length).toBe(2);

   });

});

    
    

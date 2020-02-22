if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.reverse',function(){
    
    it('should reverse the order of the elements', function(){
        var murray = new Murray('Monica','Jhon','Peter','Kate');
        murray.reverse();

        expect(murray[0]).toBe('Kate');
        expect(murray[1]).toBe('Peter');
        expect(murray[2]).toBe('Jhon');
        expect(murray[3]).toBe('Monica');
    });
  
    it('should be a murray', function(){
        var murray = new Murray (12,52,4,98);
        murray.reverse();

        expect(murray).toBeInstanceOf(Murray);
    });

    it('should not change the length of murray', function(){
        var murray = new Murray (12,52,4,98);
        murray.reverse();
        
        expect(murray.length).toBe(4);
    });

});
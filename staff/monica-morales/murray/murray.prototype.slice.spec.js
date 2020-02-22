if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.slice',function(){

    it('should show from second element(include) to the fifth element(no include)', function(){
        var names = new Murray ('monica','luis','sandra','silvia','pedro','carmen','paula');
        var family = names.slice(2,5);

        expect(names[1]).toBe('luis');
        expect(names[2]).toBe('sandra');
        expect(names[3]).toBe('silvia');
    });
    
    it('should create a new murray', function(){
        var names = new Murray ('monica','luis','sandra','silvia','pedro','carmen','paula');
        var family = names.slice(3,5);
        
        expect(family).toBeInstanceOf(Murray);
        expect(names.length).toBe(7);
        expect(family.length).toBe(2);
    });
  
    it('should not change the original murray', function(){
        var names = new Murray ('monica','luis','sandra','silvia','pedro','carmen','paula');
        names.slice(3,5);

        expect(names.length).toBe(7);
        expect(names[0]).toBe('monica');
        expect(names[1]).toBe('luis');
        expect(names[2]).toBe('sandra');
        expect(names[3]).toBe('silvia');
        expect(names[4]).toBe('pedro');
        expect(names[5]).toBe('carmen');
        expect(names[6]).toBe('paula');
    });
});
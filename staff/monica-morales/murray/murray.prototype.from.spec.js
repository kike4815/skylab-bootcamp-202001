if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.from',function(){
    
    it('Should return murray with letters of value', function(){
        var result = new Murray().from('monica');
        
        expect(result.length).toBe(6);
        expect(result[0]).toBe('m');
        expect(result[1]).toBe('o');
        expect(result[2]).toBe('n');
        expect(result[3]).toBe('i');
        expect(result[4]).toBe('c');
        expect(result[5]).toBe('a');
    });
  
    it('Should return murray with numbers of array', function(){
        var result = new Murray().from([1,2,3]);

        expect(result.length).toBe(3);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
    });

    it('Should return a object', function(){
        var result = new Murray().from('hello');

        expect(typeof result !== 'boolean').toBe(true);
    });

    it('Should return a murray', function(){
        var result = new Murray().from('hello');

        expect(result).toBeInstanceOf(Murray);
    });
});
if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.indexOf',function(){
    
    it('should return the index of the first element found', function(){
        var names = new Murray ('jhon', 'peter','phil','kate','sophy');
        var result = names.indexOf('phil');
        
        expect(result).toBe(2);
    });

    /*it('should find the value from the indicated index', function(){
        var names = new Murray ('jhon', 'peter','phil','kate','sophy');
        var result = names.indexOf('kate',2);
        
        expect(result).toBe(0);
    });*/

    it('should return -1 if element is not in murray', function(){
        var names = new Murray ('jhon', 'peter','phil','kate','sophy');
        var result = names.indexOf('jane');
        
        expect(result).toBe(-1);
    });

    it('should fail if is not a murray', function () {
        var names = 1;
        expect(function () {
        names.indexOf('jhon');
        }).toThrowError(TypeError, 'names.indexOf is not a function');
    });
});
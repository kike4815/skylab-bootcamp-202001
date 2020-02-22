describe('Murray.prototype.findIndex', function () {
    it('should return the correct position of element', function () {
        var murray = new Murray(55, 66, 44, 77);
        var callback = element => element === 55
        var value = murray.findIndex(callback)
        
        expect(value).toBe(0);
    });

    it('should return -1 if no element avaliable', function () {
        var murray = new Murray(55, 66, 44, 77);
        var callback = element => element >= 90
        var value = murray.findIndex(callback)
        
        expect(value).toBe(-1);
    });

    it('should fail when no arguments', function () {
        expect(function () {
            new Murray(1, 2, 3).findIndex();
        }).toThrowError(TypeError, 'function must contain arguments');
    });
    
});



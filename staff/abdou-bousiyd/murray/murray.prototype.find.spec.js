describe('Murray.prototype.find', function () {
    it('should return first element of the array that performs the function', function () {
        var murray = new Murray(55, 66, 44, 77);
        var callback = element => element === 44
        var value = murray.find(callback)
        
        expect(value).toBe(44);
    });

    it('should return undefined if no element avaliable', function () {
        var murray = new Murray(55, 66, 44, 77);
        var callback = element => element === 'text'
        var value = murray.find(callback)
        
        expect(value).toBeUndefined();
    });

    it('should fail when no a callback', function () {
        expect(function () {
            new Murray(1, 2, 3).find();
        }).toThrowError(TypeError, 'undefined first argument must be a function');
    });
    
});
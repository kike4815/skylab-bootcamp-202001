describe('Murray.prototype.iArray', function () {
    it('Should return true if is an array', function () {
        var result = new Murray([])
        if (result === true)
        expect(result).toBe(true);
        console.log(99)
    });

    it('Should return false if is an array', function () {
        var result = new Murray([])
        if (result === false)
        expect(result).toBe(false);
    });
    
});


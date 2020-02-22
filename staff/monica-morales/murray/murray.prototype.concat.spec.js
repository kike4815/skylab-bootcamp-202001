if(typeof require !== 'undefined'){
    var Murray = require('./murray')
}

describe('Murray.prototype.concat', function () {

    it('should concat two murrays', function () {
        var a = new Murray(1, 2, 3);
        var b = new Murray(4, 5, 6);
        var c = a.concat(b);

        expect(c.length).toBe(6);
        expect(c[0]).toBe(1);
        expect(c[1]).toBe(2);
        expect(c[2]).toBe(3);
        expect(c[3]).toBe(4);
        expect(c[4]).toBe(5);
        expect(c[5]).toBe(6);
    });

    it('should concat three murrays', function () {
        var a = new Murray(1, 2, 3);
        var b = new Murray(4, 5, 6);
        var c = new Murray(7, 8, 9);
        var d = a.concat(b,c);

        expect(d.length).toBe(9);
    });

    it('should to do double concat', function () {
        var a = new Murray(1, 2, 3);
        var b = new Murray(4, 5, 6);
        var c = new Murray(7, 8, 9);
        var d = a.concat(b.concat(c));

        expect(d.length).toBe(9);
    });

    it('should to do double concat with two arguments', function () {
        var a = new Murray(1, 2, 3);
        var b = new Murray(4, 5, 6);
        var c = new Murray(7, 8, 9);
        var d = new Murray(10,11,12);
        var e = a.concat(b.concat(c),d);

        expect(e.length).toBe(12);
    });
});
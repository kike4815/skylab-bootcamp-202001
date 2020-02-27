"use strict";

describe("call", function() {
    it("Should call and return the response on valid url", function(done) {
    var targets = [
      { url: "https://www.lavanguardia.com/", text: "vanguardia" },
      { url: "https://www.eldiario.es/", text: "eldiario" },
      { url: "https://www.elmundo.es/", text: "mundo" },
      { url: "https://www.expansion.com/", text: "expansion" },
      { url: "https://www.abc.es/", text: "abc" }
    ];
    var target = targets[Math.floor(Math.random() * targets.length)];

    call('https://skylabcoders.herokuapp.com/proxy?url=' + target.url, function(response) {
        expect(response.status).toBe(200);
        expect(response.content.toLowerCase()).toContain(target.text);
        done()
    });
    });

    it('Should fail on non valid url', function() {
        var url = 'not-an-url'

        expect(function() {
            call(url, function() {})
        }).toThrowError(SyntaxError, 'not-an-url is not a valid url')
    })
    
    it('should fail on non existing url\'s or conexion failure', function(done) {
        var url = 'https://not-valid.url'
        call(url, function(error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('Network error')
            done()
        }) 
    })
});

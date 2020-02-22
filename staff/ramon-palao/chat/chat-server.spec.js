if (typeof require !== "undefined") {
    const server = require("./chat-server")
}

describe("chat-server", () => {
    it("should the message be a string", (done) => {
        const net = require('net')
        const server = net.createServer(socket => {
            socket.on('data', chunk => {
                const message = (chunk.toString())
                console.log(message)
                socket.end('OK')
                expect(typeof message).toBe("string")
                done()
            })
        })
        server.listen(8080)
    })
})
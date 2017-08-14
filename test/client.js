const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const proto = require('../protocol');
const magicCookie = require("../magic_cookies");

sent = []

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(Array(80).join("="));
    console.log(`${msg} from ${rinfo.address}:${rinfo.port}`);
    var res = resp.deserialize(msg)
    console.log(res)
    var i = sent.indexOf(res[1])
    if (i >= 0) {
        sent.splice(i,1)
    }
    if (sent.length === 0) {
        process.exit(0)
    }
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

process.on('SIGINT', function() {
    process.exit();
});

server.bind(41235);

m1 = magicCookie.bake()
m2 = magicCookie.bake()
m3 = magicCookie.bake()
m4 = magicCookie.bake()

proto.sendPing(server, '0.0.0.0', 41234, m1)
sent.push(m1)

proto.sendStore(server, '0.0.0.0', 41234, m2, "bread", "fish")
sent.push(m2)

proto.sendFindNode(server, '0.0.0.0', 41234, m3, "bread")
sent.push(m3)

proto.sendFindValue(server, '0.0.0.0', 41234, m4, "bread")
sent.push(m4)



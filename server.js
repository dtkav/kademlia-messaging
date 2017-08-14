const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const proto = require('./protocol.js');
const resp = require('./resp')

// get an incoming message
// return some dummy responses
function respond_to_stuff(res, rinfo) {
    var msg_type = res[0]
    var msg_id = res[1]
    if (msg_type === "PING") {
        proto.sendAck(server, rinfo.address, rinfo.port, msg_id)
    } else if (msg_type === "FIND_NODE") {
        nodes = ["peer1", "192.169.1.130", 9000, "peer2", "192.168.1.130", 9001]
        proto.sendFoundNode(server, rinfo.address, rinfo.port, msg_id, res[2], nodes)
    } else if (msg_type === "STORE") {
        proto.sendAck(server, rinfo.address, rinfo.port, msg_id)
    } else if (msg_type === "FIND_VALUE") {
        nodes = ["peer1", "192.169.1.130", 9000, "peer2", "192.168.1.130", 9001]
        proto.sendFoundValue(server, rinfo.address, rinfo.port,
                             msg_id, res[2], "fish", nodes)
    }
}

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`${msg} from ${rinfo.address}:${rinfo.port}`);
    var res = resp.deserialize(msg)
    console.log(res)
    respond_to_stuff(res, rinfo)
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

process.on('SIGINT', function() {
    process.exit();
});

server.bind(41234);

resp = require("./resp")

// send PING UUID
function serializePing(msg_id) {
    return resp.serialize(["PING", msg_id])
}

// send STORE UUID
function serializeStore(msg_id, key, value) {
    return resp.serialize(["STORE", msg_id, key, value])
}

// send ACK UUID
function serializeAck(msg_id) {
    return resp.serialize(["ACK", msg_id])
}

// send FIND_NODE UUID KEY
function serializeFindNode(msg_id, key) {
    return resp.serialize(["FIND_NODE", msg_id, key])
}

// send FOUND_NODE UUID KEY [NODE_KEY{n} NODE_IP{n} NODE_PORT{n}, ...]
//  "nodes": [(KEY, IP_ADRESS, PORT)],
function serializeFoundNodes(msg_id, key, nodes) {
    return resp.serialize(["FOUND_NODE", msg_id, key, nodes])
}

// send FIND_VALUE UUID KEY
function serializeFindValue(msg_id, key) {
    return resp.serialize(["FIND_VALUE", msg_id, key])
}

// send FOUND_VALUE UUID KEY VALUE [NODE_KEY{n} NODE_IP{n} NODE_PORT{n}, ...]
//  "nodes": [(KEY, IP_ADRESS, PORT)],
function serializeFoundValue(msg_id, key, value, nodes) {
    return resp.serialize(["FOUND_VALUE", msg_id, key, value, nodes])
}

exports.ping = serializePing
exports.ack = serializeAck
exports.store = serializeStore
exports.findNode = serializeFindNode
exports.foundNodes = serializeFoundNodes
exports.findValue = serializeFindValue
exports.foundValue = serializeFoundValue

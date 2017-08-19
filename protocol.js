// the kademlia protocol

const messages = require('./messages')

// PING_REQUEST
// {
//  "magic_cookie"
// }
function sendPing (client, addr, port, msgId) {
  var msg = messages.ping(msgId)
  client.send(msg, port, addr)
  return msgId
}

// ACK
// {
//  "magic_cookie"
// }
function sendAck (client, addr, port, msgId) {
  var msg = messages.ack(msgId)
  client.send(msg, port, addr)
  return msgId
}

// STORE_REQUEST
// {
//  "magic_cookie",
//  "key",
//  "val"
// }
function sendStore(client, addr, port, msgId, key, value) {
    msg = messages.store(msgId, key, value)
    client.send(msg, port, addr);
    return msgId 
}

// FIND_NODE_REQUEST
// {
//  "magic_cookie",
//  "key"  // same as node_id
// }
function sendFindNode (client, addr, port, msgId, key) {
  var msg = messages.findNode(msgId, key)
  client.send(msg, port, addr)
  return msgId
}

// FIND_NODE_RESPONSE
// {
//  "magic_cookie",
//  "key",
//  "nodes": [(KEY, IP_ADDRESS, PORT)]
// }
function sendFoundNode (client, addr, port, msgId, key, nodes) {
  var msg = messages.foundNodes(msgId, key, nodes)
  client.send(msg, port, addr)
  return msgId
}

// FIND_VAL_REQUEST
// {
//  "magic_cookie",
//  "key"
// }
function sendFindValue (client, addr, port, msgId, key) {
  var msg = messages.findValue(msgId, key)
  client.send(msg, port, addr)
  return msgId
}

// FIND_VALUE_RESPONSE
// {
//  "magic_cookie",
//  "key",
//  "value",
//  "nodes": [(KEY, IP_ADDRESS, PORT)]
// }
function sendFoundValue (client, addr, port, msgId, key, value, nodes) {
  var msg = messages.foundValue(msgId, key, value, nodes)
  client.send(msg, port, addr)
  return msgId
}

exports.sendAck = sendAck
exports.sendStore = sendStore
exports.sendPing = sendPing
exports.sendFindNode = sendFindNode
exports.sendFoundNode = sendFoundNode
exports.sendFindValue = sendFindValue
exports.sendFoundValue = sendFoundValue

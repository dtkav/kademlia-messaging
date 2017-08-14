// the kademlia protocol

messages = require("./messages")

// PING_REQUEST
// {
//  "magic_cookie"
// }
function sendPing(client, addr, port, msg_id) {
  msg = messages.ping(msg_id)
  client.send(msg, port, addr, (err) => {
  });
  return msg_id
}

// ACK
// {
//  "magic_cookie"
// }
function sendAck(client, addr, port, msg_id) {
  msg = messages.ack(msg_id)
  client.send(msg, port, addr, (err) => {
  });
  return msg_id
}

// STORE_REQUEST
// {
//  "magic_cookie",
//  "key",
//  "val"
// }
function sendStore(client, addr, port, msg_id, key, value) {
    msg = messages.store(msg_id, key, value)
    client.send(msg, port, addr, (err) => {});
    return msg_id 
}

// FIND_NODE_REQUEST
// {
//  "magic_cookie",
//  "target_address",
//  "key"
// }
function sendFindNode(client, addr, port, msg_id, key) {
  msg = messages.findNode(msg_id, key)
  client.send(msg, port, addr, (err) => {
  });
  return msg_id
}

// FIND_NODE_RESPONSE
// {
//  "magic_cookie",
//  "key",
//  "nodes": [(KEY, IP_ADRESS)]
// }
function sendFoundNode(client, addr, port, msg_id, key, nodes) {
  msg = messages.foundNodes(msg_id, key, nodes)
  client.send(msg, port, addr, (err) => {
  });
  return msg_id
}

// FIND_VAL_REQUEST
// {
//  "magic_cookie",
//  "target_address",
//  "key"
// }
function sendFindValue(client, addr, port, msg_id, key) {
  msg = messages.findValue(msg_id, key)
  client.send(msg, port, addr, (err) => {
  });
  return msg_id
}

// FIND_VALUE_RESPONSE
// {
//  "magic_cookie",
//  "key",
//  "value",
//  "nodes": [(KEY, IP_ADRESS)]
// }
function sendFoundValue(client, addr, port, msg_id, key, value, nodes) {
  msg = messages.foundValue(msg_id, key, value, nodes)
  client.send(msg, port, addr, (err) => {
  });
  return msg_id
}

exports.sendAck = sendAck
exports.sendStore = sendStore
exports.sendPing = sendPing
exports.sendFindNode = sendFindNode
exports.sendFoundNode = sendFoundNode
exports.sendFindValue = sendFindValue
exports.sendFoundValue = sendFoundValue

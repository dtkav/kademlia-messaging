// RESP redis protocol

const CRLF = "\r\n"

function parseArray(parser) {
    var res = []
    var len = parser.msg[parser.offset++] - 48
    parser.offset += 2 // chomp \r\n
    for(var j=0; j<len; j++) {
        res.push(parseType(parser))
    }
    return res
}

function parseSimpleString(parser) {
    var ss = ""
    for(var i = parser.offset; i < parser.msg.toString("utf-8").length; i++) {
        var c = parser.msg.toString("utf-8")[parser.offset]
        if (c === "\r") {
            parser.offset += 2
            break
        }
        ss += c
        parser.offset++
    }
    return ss
}

function parseInteger(parser) {
    return parseInt(parseSimpleString(parser))
}

// unescape carriage return and newline
// so messages print on one line
function _cleanCRLF(s) {
  return s.replace(/\n/g, "\\n").replace(/\r/g, "\\r")
}

// print the raw message on one line,
//   and the parsers progress on the next
function _progressPrint(parser) {
  var msg = parser.msg
  var i = parser.offset
  var utf8str = msg.toString("utf-8")
  var substr = _cleanCRLF(utf8str.slice(0,i+1))
  console.log(Array(80).join("="))
  console.log(_cleanCRLF(utf8str))
  console.log(Array(substr.length-1).join(" ") + "^")
}

// recursively parse any type
function parseType(parser) {
  type = parser.msg[parser.offset++]
  // _progressPrint(parser)
  switch (type) {
    //case 36:
    //  return parseBulkString(parser)
    case 43:
      return parseSimpleString(parser)
    case 42:
      return parseArray(parser)
    case 58:
      return parseInteger(parser)
    //case "-":
    //  return parseError(parser)
    default:
      console.log("got unknown message type!", type)
      throw type 
  }
}

function deserialize(message) {
    var parser = {
        "msg": message,
        "offset": 0
    }
    return parseType(parser)
}

function serializeArray(items) {
    var msg = "*" + items.length + CRLF
    for(item of items) {
        msg += serialize(item)
    }
    return msg
}

function serializeNumber(n) {
    return ":" + n + CRLF
}

function serializeString(s) {
    return "+" + s + CRLF
}

function serialize(thing) {
    switch (typeof(thing)) {
        case "number":
            return serializeNumber(thing)
        case "string":
            return serializeString(thing)
        case "object":
            // array is special case...
            if (Array.isArray(thing)) {
                return serializeArray(thing)
            }
        default:
            console.log("can't serialize " + thing)
            throw thing
    }
}

exports.deserialize = deserialize
exports.serialize = serialize

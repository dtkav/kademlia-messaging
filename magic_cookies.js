const crypto = require('crypto');

// return a random sequence of characters
function randomId(n_bytes) {
    return crypto.randomBytes(n_bytes).toString('hex');
}

function bake() {
    return randomId(20)
}

exports.randomId = randomId;
exports.bake = bake;

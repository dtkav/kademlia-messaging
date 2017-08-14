magicCookies = require("../magic_cookies")
assert = require("assert")

c1 = magicCookies.bake()
c2 = magicCookies.bake()

// no two ids should be the same
assert.notEqual(c1, c2)

// cookies have a fixed length 
assert.equal(c1.length, c2.length)

// expect string length to be double because hex
assert.equal(magicCookies.randomId(20).length, 20*2)
assert.equal(magicCookies.randomId(40).length, 40*2)


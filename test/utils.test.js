"use strict";

const assert = require('chai').assert;
const Utils = require('../app/common/utils');

describe("Utils", () => {
    it("Generate Time Strings", () => {
        let t1 = Utils.generateTimeString(0);
        assert.strictEqual(t1, "00:00");
        t1 = Utils.generateTimeString(1);
        assert.strictEqual(t1, "00:01");
        t1 = Utils.generateTimeString(60);
        assert.strictEqual(t1, "01:00");
        t1 = Utils.generateTimeString(600);
        assert.strictEqual(t1, "10:00");
        t1 = Utils.generateTimeString(3601);
        assert.strictEqual(t1, "01:00:01");
        t1 = Utils.generateTimeString(356400);
        assert.strictEqual(t1, "99:00:00");
        t1 = Utils.generateTimeString(363600);
        assert.strictEqual(t1, "101:00:00");
    });
});

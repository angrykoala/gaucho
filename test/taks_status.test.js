"use strict";

const assert = require('chai').assert;
const TaskStatus = require('../app/common/task_status');

describe("Utils", () => {
    it("Valid Status", () => {
        assert.isOk(TaskStatus.idle);
        assert.isOk(TaskStatus.error);
        assert.isOk(TaskStatus.running);
        assert.isOk(TaskStatus.ok);
        assert.isOk(TaskStatus.stopped);    
    });
});

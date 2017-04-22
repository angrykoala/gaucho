"use strict";

const path = require('path');
const assert = require('chai').assert;

const config = require('./config');

const Task = require('../app/renderer/task');
const TaskStatus = require('../app/common/task_status');

describe("Tasks", () => {
    let testTask;
    const taskCommand = "node " + path.join(config.testResources, config.taskFiles.helloWorld);
    beforeEach(() => {
        testTask = new Task("Test", "", taskCommand);
    });

    afterEach(() => {
        testTask.stop();
    });


    it("Valid Tasks Status", () => {
        assert.isOk(TaskStatus.idle);
        assert.isOk(TaskStatus.error);
        assert.isOk(TaskStatus.running);
        assert.isOk(TaskStatus.ok);
        assert.isOk(TaskStatus.stopped);
    });

    it("Valid Task Execution", (done) => {
        assert.isFalse(testTask.isRunning());
        assert.strictEqual(testTask.status, TaskStatus.idle);
        testTask.run(() => {}, () => {
            assert.isFalse(testTask.isRunning());
            assert.strictEqual(testTask.status, TaskStatus.ok);
            done();

        });
        assert.isTrue(testTask.isRunning());
        assert.strictEqual(testTask.status, TaskStatus.running);

    });
    it.skip("Create Invalid Task", () => {

    });
});

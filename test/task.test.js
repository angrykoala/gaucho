"use strict";

const path = require('path');
const assert = require('chai').assert;

const config = require('./config');

const Task = require('../app/common/task');
const TaskStatus = require('../app/common/task_status');

describe("Tasks", () => {
    let testTask;
    const taskCommand = `node ${path.join(config.testResources, config.taskFiles.helloWorld)}`;
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

    it("Correct Task Execution", (done) => {
        let stdoutCalled = false;
        assert.isFalse(testTask.isRunning());
        assert.strictEqual(testTask.status, TaskStatus.idle);

        function stdout(text) {
            assert.strictEqual(text, "hello");
            stdoutCalled = true;
        }

        testTask.run(stdout, () => {
            assert.isFalse(testTask.isRunning());
            assert.strictEqual(testTask.status, TaskStatus.ok);
            assert.isTrue(stdoutCalled);
            done();
        });
        assert.isTrue(testTask.isRunning());
        assert.strictEqual(testTask.status, TaskStatus.running);
    });

    it("Get Task Config", () => {
        const taskData = testTask.getData();
        const expectedResult = {
            title: "Test",
            command: taskCommand
        };
        assert.strictEqual(JSON.stringify(taskData), JSON.stringify(expectedResult));
    });

    it("Get Task Config with path", () => {
        const taskConfigTest = new Task("Test", "a/path", taskCommand);
        const taskData = taskConfigTest.getData();
        const expectedResult = {
            title: "Test",
            command: taskCommand,
            path: "a/path"
        };
        assert.strictEqual(JSON.stringify(taskData), JSON.stringify(expectedResult));
    });

    it("Invalid Task Execution", (done) => {
        let invalidTask = new Task("Invalid test", "", "invalidTask");

        invalidTask.run(() => {}, () => {
            assert.strictEqual(invalidTask.status, TaskStatus.error);
            done();
        });
    });

    it("Update Execution Time", () => {
        assert.throws(() => {
            testTask._updateElapsedTime();
        });
        assert.isNull(testTask.elapsedTime);

        testTask.run(() => {}, () => {});
        assert.doesNotThrow(() => {
            testTask._updateElapsedTime();
        });
        assert.isNumber(testTask.elapsedTime);
    });

    it("Stop task", (done) => {
        testTask.run(() => {}, () => {
            assert.isFalse(testTask.isRunning());
            assert.strictEqual(testTask.status, TaskStatus.stopped);
            testTask.stop();
            assert.strictEqual(testTask.status, TaskStatus.stopped);
            done();
        });
        testTask.stop();
    });

    it("Trying to run a running task", (done) => {
        assert.isFalse(testTask.isRunning());
        assert.strictEqual(testTask.status, TaskStatus.idle);

        testTask.run(() => {}, () => {
            assert.isFalse(testTask.isRunning());
            assert.strictEqual(testTask.status, TaskStatus.ok);
            done();
        });
        assert.isTrue(testTask.isRunning());
        assert.throws(() => testTask.run(() => {}, () => {}))
    });
});

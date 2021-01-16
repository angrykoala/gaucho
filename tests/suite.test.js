"use strict";

const assert = require('chai').assert;
const sinon = require('sinon');

const Suite = require('../src/app/common/suite');
const Task = require('../src/app/common/task');
const TaskStatus = require('../src/app/common/task_status');

describe("Suite", () => {
    let taskStub;
    let testSuite;

    function createStub(taskStub2) {
        sinon.stub(taskStub2, "getData").returns("taskStub");
        sinon.stub(taskStub2, "run").callsFake(() => {
            taskStub2.status = TaskStatus.running;
        });
        sinon.stub(taskStub2, "stop").callsFake(() => {
            taskStub2.status = TaskStatus.idle;
        });
    }

    function restoreStub(taskStub2) {
        taskStub2.getData.restore();
        taskStub2.run.restore();
        taskStub2.stop.restore();
    }

    beforeEach(() => {
        taskStub = new Task({
            title: "test",
            commands: "command"});
        testSuite = new Suite("Test");
        createStub(taskStub);
    });

    afterEach(() => {
        restoreStub(taskStub);
    });

    it("Create New Suite", () => {
        const suite = new Suite("Suite Title");
        assert.strictEqual(suite.title, "Suite Title");
        assert.strictEqual(suite.length, 0);
    });

    it("Add and Remove Tasks", () => {
        assert.strictEqual(testSuite.length, 0);
        testSuite.addTask(taskStub);
        assert.strictEqual(testSuite.length, 1);
        testSuite.removeTask(0);
        assert.strictEqual(testSuite.length, 0);
        testSuite.removeTask(0);
        assert.strictEqual(testSuite.length, 0);
    });

    it("Stop All Tasks", () => {
        const taskStub2 = new Task({
            title: "test2",
            command: "command"
        });
        createStub(taskStub2);
        taskStub2.status = TaskStatus.running;

        testSuite.addTask(taskStub);
        testSuite.addTask(taskStub2);
        assert.isFalse(taskStub.isRunning());
        assert.isTrue(taskStub2.isRunning());
        testSuite.stopAll();
        assert.isFalse(taskStub.isRunning());
        assert.isFalse(taskStub2.isRunning());
        assert.isFalse(taskStub.stop.called);
        assert.isTrue(taskStub2.stop.called);

        restoreStub(taskStub2);
    });

    it("Replace Tasks", () => {
        const taskStub2 = new Task({
            title: "secondTask",
            command: "command"
        });
        createStub(taskStub2);

        testSuite.addTask(taskStub);
        testSuite.replaceTask(0, taskStub2);
        assert.strictEqual(testSuite.length, 1);
        assert.strictEqual(testSuite.tasks[0].title, "secondTask");
    });

    it("Get Data", () => {
        const suiteData = testSuite.getData();
        const expectedData = {
            title: "Test",
            tasks: []
        };

        assert.strictEqual(JSON.stringify(suiteData), JSON.stringify(expectedData));
    });

    it("Get Data With Tasks", () => {
        testSuite.addTask(taskStub);
        const suiteData = testSuite.getData();
        const expectedData = {
            title: "Test",
            tasks: ["taskStub"]
        };

        assert.strictEqual(JSON.stringify(suiteData), JSON.stringify(expectedData));
    });

    it("Add Task With Repeated Name", () => {
        const taskStub2 = new Task({
            title: "test",
            command: "command"});
        createStub(taskStub2);
        const taskStub3 = new Task({
            title: "test",
            command: "command"});
        createStub(taskStub3);
        testSuite.addTask(taskStub);
        testSuite.addTask(taskStub2);
        testSuite.addTask(taskStub3);
        assert.lengthOf(testSuite.tasks, 3);
        assert.strictEqual(testSuite.tasks[0].title, "test");
        assert.strictEqual(testSuite.tasks[1].title, "test (2)");
        assert.strictEqual(testSuite.tasks[2].title, "test (3)");

        restoreStub(taskStub2);
        restoreStub(taskStub3);
    });

    it("Replace Task With Repeated Name", () => {
        const taskStub2 = new Task({
            title: "different_name",
            command: "command"});
        createStub(taskStub2);
        const taskStub3 = new Task({
            title: "test",
            command: "command"});
        createStub(taskStub3);
        testSuite.addTask(taskStub);
        testSuite.addTask(taskStub2);
        testSuite.replaceTask(1, taskStub3);
        assert.lengthOf(testSuite.tasks, 2);
        assert.strictEqual(testSuite.tasks[0].title, "test");
        assert.strictEqual(testSuite.tasks[1].title, "test (2)");
    });

    it("Replace Task With Same Name", () => {
        const taskStub2 = new Task({
            title: "test",
            command: "command"});
        createStub(taskStub2);

        testSuite.addTask(taskStub);
        testSuite.replaceTask(0, taskStub2);
        assert.lengthOf(testSuite.tasks, 1);
        assert.strictEqual(testSuite.tasks[0].title, "test");
    });
});

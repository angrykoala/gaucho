"use strict";

const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');

const Task = require('../app/renderer/task');
const Suite = require('../app/renderer/suite');
const TaskImporter = require('../app/common/task_importer');

describe("Task Importer", () => {
    const tempFolder = path.join(__dirname, "temp");
    const testJsonFile = path.join(tempFolder, "exported_test.json");

    const testTask1 = new Task("task1", ".", "test command");
    const testTask2 = new Task("task2", "./path", "test command2");
    const testSuite1 = new Suite("suite1");
    const testSuite2 = new Suite("suite2");
    testSuite1.addTask(testTask1);
    testSuite1.addTask(testTask2);

    function assertParsedSuite(content, version) {
        assert.isOk(content);
        assert.isString(content);
        const taskConfig = JSON.parse(content);
        assert.strictEqual(taskConfig.version, version);
        const suites = taskConfig.suites;
        assert.isArray(suites);

        assert.strictEqual(suites.length, 2);
        assert.strictEqual(suites[0].title, "suite1");

        const tasks = suites[0].tasks;
        assert.strictEqual(tasks.length, 2);
        assert.strictEqual(tasks[0].title, "task1");
        assert.strictEqual(tasks[0].path, ".");
        assert.strictEqual(tasks[0].command, "test command");

        assert.strictEqual(tasks[1].title, "task2");
        assert.strictEqual(tasks[1].path, "./path");
        assert.strictEqual(tasks[1].command, "test command2");

        assert.strictEqual(suites[1].title, "suite2");
        assert.strictEqual(suites[1].tasks.length, 0);
    }



    beforeEach((done) => {
        fs.mkdir(tempFolder, () => {
            done();
        });
    });
    afterEach((done) => {
        fs.unlink(testJsonFile, () => {
            fs.rmdir(tempFolder, () => {
                done();
            });
        });
    });

    it("parseToJson", () => {
        const result = TaskImporter.parseToJson([testSuite1, testSuite2], "test_version");
        assertParsedSuite(result, "test_version");

    });
    it("export", (done) => {
        TaskImporter.export(testJsonFile, [testSuite1, testSuite2], "test_version").then(() => {
            fs.readFile(testJsonFile, 'utf-8', (err, data) => {
                assert.notOk(err, "Error reading test file");
                assertParsedSuite(data, "test_version");
                done();
            });
        });
    });
    it.skip("import", () => {
        throw new Error("Not implemented");
    });
});

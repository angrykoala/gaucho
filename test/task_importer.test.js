"use strict";

const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');

const Task = require('../app/common/task');
const Suite = require('../app/common/suite');
const TaskImporter = require('../app/common/task_importer');

const config=require('./config');

describe("Task Importer", () => {
    const tempFolder = path.join(__dirname, "temp");
    const testJsonFile = path.join(tempFolder, "exported_test.json");
    const testTasksFile = path.join(config.testResources, "test_tasks.json");

    const testTask1 = new Task("task1", ".", "test command");
    const testTask2 = new Task("task2", "./path", "test command2");
    const testSuite1 = new Suite("suite1");
    const testSuite2 = new Suite("suite2");
    testSuite1.addTask(testTask1);
    testSuite1.addTask(testTask2);

    function assertParsedSuite(taskConfig, version) {

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

    it("Parse to json", () => {
        const result = TaskImporter.parseToJson([testSuite1, testSuite2], "test_version");
        assert.isOk(result);
        assert.isString(result);
        const taskConfig = JSON.parse(result);
        assertParsedSuite(taskConfig, "test_version");
    });

    it("Export suites", (done) => {
        TaskImporter.export(testJsonFile, [testSuite1, testSuite2], "test_version").then(() => {
            fs.readFile(testJsonFile, 'utf-8', (err, data) => {
                assert.notOk(err, "Error reading test file");
                assert.isOk(data);
                assert.isString(data);
                const taskConfig = JSON.parse(data);
                assertParsedSuite(taskConfig, "test_version");
                done();
            });
        });
    });

    it("Import from file", () => {
        return TaskImporter.import(testTasksFile).then((data)=>{
            assert.isOk(data);
            assertParsedSuite(data, "my_version");
        });
    });

    it("Import invalid file", (done) => {
        const testFile=path.join(config.testResources, config.taskFiles.helloWorld);
        assert.isTrue(fs.existsSync(testFile));
        TaskImporter.import(testFile).catch((error)=>{
            assert.ok(error);
            done();
        });
    });

    it("Import invalid path", (done) => {
        const testFile=path.join("no_file");
        assert.isFalse(fs.existsSync(testFile));
        TaskImporter.import(testFile).catch((error)=>{
            assert.ok(error);
            done();
        });
    });
});

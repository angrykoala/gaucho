"use strict";

const Suite = require('../common/suite');
const Task = require('../common/task');
const AppConfig = require('../common/app_config');

const suites = [];
class TasksHandler {
    get suites() {
        return suites;
    }
    addSuite(suite) {
        suites.push(suite);
    }
    loadTasksFromConfig() {
        const tasksConfig = new AppConfig.Tasks();
        let suites = tasksConfig.get("suites");
        if (!this._isValid(suites)) {
            console.error("Loaded tasks are not valid");
            suites = [{
                title: "Default Suite",
                tasks: []
            }];
        }
        this._loadTasks(suites);
    }
    loadTasksFromData(data) {
        this._loadTasks(data.suites);
        this.saveTasks();
    }
    _loadTasks(suites){
        this.clearTasks();
        const loadedSuites = this._parseData(suites);
        loadedSuites.forEach((suite) => {
            this.addSuite(suite);
        });
    }
    saveTasks() {
        const tasksConfig = new AppConfig.Tasks();
        const data = this.suites.map((suite) => suite.getData());

        if (this._isValid(data)) {
            tasksConfig.set("suites", data);
        }
    }
    addDefaultSuite() {
        suites.push(new Suite("Suite 1"));
        this.saveTasks();
    }
    clearTasks() {
        for (const suite of this.suites) {
            suite.stopAll();
        }
        this.suites.splice(0, this.suites.length);
    }
    _isValid(data) {
        return (Array.isArray(data) && data.length >= 1);
    }
    _parseData(data) {
        return data.map((suite) => {
            let result = new Suite(suite.title);
            result.tasks = suite.tasks.map((task) => new Task(task.title, task.path, task.command));
            return result;
        });
    }
}

module.exports = new TasksHandler();

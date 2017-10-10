"use strict";

const Suite = require('./suite');
const Task = require('./task');
const AppConfig = require('../common/app_config');

module.exports = {
    suites: [],
    loadTasks() {
        const tasksConfig = new AppConfig.Tasks();
        let suites = tasksConfig.get("suites");
        if (!this.isValid(suites)) {
            console.error("Loaded tasks are not valid");
            suites = [{
                title: "Default Suite",
                tasks: []
            }];
        }
        this.suites = this.parseData(suites);
    },
    saveTasks() {
        const tasksConfig = new AppConfig.Tasks();
        const data = this.suites.map((suite) => suite.getData());

        if (this.isValid(data)) {
            tasksConfig.set("suites", data);
        }
    },
    clearTasks() {
        for (const suite of this.suites) {
            suite.stopAll();
        }
        this.suites[0] = new Suite("Default Suite");
        this.suites.splice(1, this.suites.length);
        this.saveTasks();
    },
    isValid(data) {
        return (Array.isArray(data) && data.length >= 1);
    },
    parseData(data) {
        return data.map((suite) => {
            let result = new Suite(suite.title);
            result.tasks = suite.tasks.map((task) => new Task(task.title, task.path, task.command));
            return result;
        });
    }
};

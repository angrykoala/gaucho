"use strict";

const Suite = require('../common/suite');
const Task = require('../common/task');
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
        this.suites.splice(0, this.suites.length);
        this.suites.push(new Suite("Suite 0"));
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

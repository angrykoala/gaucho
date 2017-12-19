"use strict";

const Suite = require('../common/suite');
const Task = require('../common/task');
const AppConfig = require('../common/app_config');


module.exports = class TasksHandler {

    static loadTasksFromConfig() {
        const tasksConfig = new AppConfig.Tasks();
        let rawSuites = tasksConfig.get("suites");
        if (!this._isValid(rawSuites)) {
            console.error("Loaded tasks are not valid");
            rawSuites = [{
                title: "Default Suite",
                tasks: []
            }];
        }
        return this._loadTasks(rawSuites);
    }

    static loadTasksFromData(data) {
        return this._loadTasks(data.suites);
    }

    static saveTasks(suites) {
        const tasksConfig = new AppConfig.Tasks();
        const data = suites.map((suite) => suite.getData());

        if (this._isValid(data)) {
            tasksConfig.set("suites", data);
        }
    }

    static _loadTasks(rawSuites) {
        return this._parseData(rawSuites);
    }


    static _isValid(data) {
        return (Array.isArray(data) && data.length >= 1);
    }

    static _parseData(data) {
        return data.map((suite) => {
            let result = new Suite(suite.title);
            result.tasks = suite.tasks.map((task) => new Task(task.title, task.path, task.command));
            return result;
        });
    }
};

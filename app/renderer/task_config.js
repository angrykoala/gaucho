"use strict";
const Store = require('electron-store');

const Suite = require('./suite');
const Task = require('./task');

// Just for basic offuscation of the config file
const key = "Z4xu6Nzj";


const defaultTasks = [{
    "title": "My Project",
    "tasks": [{
        "title": "Install",
        "command": "npm install"
    }, {
        "title": "Test",
        "command": "npm test"
    }, {
        "title": "Another awesome task",
        "command": "echo 'The result of my awesome task'"

    }, {
        "title": "Start",
        "command": "npm start"

    }]
}, {
    "title": "Suite 2",
    "tasks": [{
        "title": "Hello World 2",
        "command": "echo 'hello world'"
    }]
}];

module.exports = {
    suites: [],
    loadConfig() {
        const store = new Store({
            name: "gaucho_tasks",
            encryptionKey: key
        });
        let suites = store.get("suites");
        if (!this.isValid(suites)) {
            suites = defaultTasks;
        }
        this.suites = this.parseData(suites);
    },
    saveConfig() {
        const store = new Store({
            name: "gaucho_tasks",
            encryptionKey: key
        });
        const data = this.suites.map((suite) => {
            return suite.getData();
        });

        if (this.isValid(data)) {
            store.set("suites", data);
        }
    },
    isValid(data) {
        return (Array.isArray(data) && data.length >= 1);
    },
    parseData(data) {
        return data.map((suite) => {
            let result = new Suite(suite.title);
            result.tasks = suite.tasks.map((task) => {
                return new Task(task.title, task.path, task.command);
            });
            return result;
        });
    }
};

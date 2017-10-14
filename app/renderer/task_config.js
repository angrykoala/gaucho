"use strict";
const Store = require('electron-store');
const Suite = require('./suite');
const Task = require('./task');
const AppStatus = require('./app_status');
const AppConfig = require('../common/app_config');


// Just for basic offuscation of the config file
const key = "Z4xu6Nzj";
const storeName = utils.isDevEnv() ? "gaucho_dev_tasks" : "gaucho_tasks";

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
  loadTasksFrom(data){
    let json = JSON.parse(data);
    this.suites = this.parseData(json.suites) ;
    this.saveTasks();
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

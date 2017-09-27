"use strict";

const EventEmitter = require('events');

const TaskConfig = require('./task_config');
const version = require('../../package.json').version;
const AppConfigStatus = require('./app_config_status');

module.exports = {
    editMode: false,
    activeSuite: 0,
    events: new EventEmitter(),
    toggleEdit() {
        this.editMode = !this.editMode;
        TaskConfig.saveTasks();
    },
    config: new AppConfigStatus(),
    maxSuites: 6,
    maxTasksPerSuite: 8,
    totalTasks: 0,
    runningTasks: 0,
    version: version
};

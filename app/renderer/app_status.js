"use strict";

const EventEmitter = require('events');

const TasksHandler = require('./tasks_handler');
const version = require('../../package.json').version;
const AppConfigStatus = require('./app_config_status');

module.exports = {
    editMode: false,
    activeSuite: 0,
    events: new EventEmitter(),
    toggleEdit() {
        this.editMode = !this.editMode;
        TasksHandler.saveTasks();
    },
    config: new AppConfigStatus(),
    maxSuites: 6,
    maxTasksPerSuite: 8,
    totalTasks: 0,
    runningTasks: 0,
    version: version,
    currentContextMenu: null
};

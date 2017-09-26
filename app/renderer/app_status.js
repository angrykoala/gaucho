"use strict";

const remote = require('electron').remote;
const EventEmitter = require('events');

const TaskConfig = require('./task_config');
const version = require('../../package.json').version;

module.exports = {
    editMode: false,
    activeSuite: 0,
    events: new EventEmitter(),
    toggleEdit() {
        this.editMode = !this.editMode;
        TaskConfig.saveConfig();
    },
    config: remote.getCurrentWindow().userConfig, //TODO: improve how this works
    maxSuites: 6,
    maxTasksPerSuite: 8,
    totalTasks: 0,
    runningTasks: 0,
    version: version
};

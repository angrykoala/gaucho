"use strict";

const remote = require('electron').remote;
const EventEmitter = require('events');

const TaskConfig = require('./task_config');

module.exports = {
    editMode: false,
    activeSuite: 0,
    events: new EventEmitter(),
    toggleEdit() {
        this.editMode = !this.editMode;
        TaskConfig.saveConfig();
    },
    config: remote.getCurrentWindow().userConfig,
    maxSuites: 6,
    maxTasksPerSuite: 8
};

"use strict";

const EventEmitter = require('events');

const version = require('../../package.json').version;
const AppConfigStatus = require('./app_config_status');

module.exports = {
    editMode: false,
    activeSuite: 0,
    events: new EventEmitter(),
    config: new AppConfigStatus(),
    maxSuites: 6,
    maxTasksPerSuite: 8,
    totalTasks: 0,
    runningTasks: 0,
    version: version
};

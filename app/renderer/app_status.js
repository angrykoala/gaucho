"use strict";

const EventEmitter = require('events');

const version = require('../../package.json').version;
const AppConfigStatus = require('./app_config_status');

module.exports = {
    editMode: false,
    activeSuite: 0,
    events: new EventEmitter(),
    config: new AppConfigStatus(),
    totalTasks: 0,
    runningTasks: 0,
    version: version,
    maxSuitesRange: {
        min: 1,
        max: 6
    },
    maxTasksPerSuiteRange: {
        min: 1,
        max: 8
    }
};

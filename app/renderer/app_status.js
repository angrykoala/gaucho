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
        min: 6,
        max: 12
    },
    maxTasksPerSuiteRange: {
        min: 8,
        max: 20
    }
};

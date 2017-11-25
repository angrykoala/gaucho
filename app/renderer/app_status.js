"use strict";

const EventEmitter = require('events');

const version = require('../../package.json').version;
const AppConfigStatus = require('./app_config_status');

// TODO: move this to vuex storage
module.exports = {
    events: new EventEmitter(),
    config: new AppConfigStatus(),
    maxSuites: 6,
    maxTasksPerSuite: 8,
    totalTasks: 0,
    runningTasks: 0,
    version: version
};

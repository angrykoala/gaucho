"use strict";

const EventEmitter = require('events');

// TODO: move this to vuex storage
module.exports = {
    events: new EventEmitter(),
    maxTasksPerSuite: 8,
    totalTasks: 0,
    runningTasks: 0
};

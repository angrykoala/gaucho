"use strict";

const EventEmitter = require('events');

// TODO: move this to vuex storage
module.exports = {
    events: new EventEmitter(),
    runningTasks: 0
};

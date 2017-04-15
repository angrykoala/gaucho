"use strict";

const defaultInterval = 1000;

module.exports = function(eventEmitter, intervalTime = defaultInterval) {
    setInterval(() => {
        eventEmitter.emit("time-update");
    }, intervalTime);
};

"use strict";

module.exports = function(eventEmitter, intervalTime) {
    setInterval(() => {
        eventEmitter.emit("time-update");
    }, intervalTime);
};

"use strict";

const intervalTime = 1000;

module.exports = function(eventEmitter) {
    setInterval(() => {
        eventEmitter.emit("time-update");
    }, intervalTime);
};

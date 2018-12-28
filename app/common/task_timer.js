"use strict";

const EventEmitter = require('events');


function setTimer(eventEmitter, intervalTime) {
    eventEmitter.setMaxListeners(91);
    setInterval(() => {
        eventEmitter.emit("time-update");
    }, intervalTime);
}

const TaskEvents = new EventEmitter();
setTimer(TaskEvents, 1000);

const TIMER_STATE = {
    RUNNING: "running",
    STOPPED: "stopped"
};

module.exports = class TaskTimer {
    constructor() {
        this.startingTime = null;
        this.elapsedSeconds = null;
        this._timerCallback = null;

        this.state = TIMER_STATE.STOPPED;

    }

    start() {
        if(this.state === TIMER_STATE.STARTED) throw new Error("Cannot Start task timer twice");
        this.startingTime = new Date();
        this._timerCallback = () => { // Required to register and remove listeners
            this._updateElapsedTime();
        };
        TaskEvents.on("time-update", this._timerCallback);
        this.state = TIMER_STATE.RUNNING;
        this._updateElapsedTime();
    }

    stop() {
        if(this.state === TIMER_STATE.STOPPED) throw new Error("Cannot Stop task timer twice");
        TaskEvents.removeListener("time-update", this._timerCallback);
        this._updateElapsedTime();
        this.state = TIMER_STATE.STOPPED;
    }

    _updateElapsedTime() {
        if (this.startingTime === null) throw new Error("Error, cant update time");
        const currentTime = Date.now();
        this.elapsedSeconds = Math.trunc((currentTime - this.startingTime) / 1000);
    }

};

"use strict";

const EventEmitter = require('events');
const TaskTimer = require('../app/common/timer');


describe("Timer", () => {
    let events;
    beforeEach(() => {
        events = new EventEmitter();
    });

    afterEach(() => {
        events.removeAllListeners();
    });

    it("Timer Setup", (done) => {
        let i = 0;
        events.on("time-update", () => {
            i++;
            if (i === 2) done();
        });
        TaskTimer(events, 1);
    });
});

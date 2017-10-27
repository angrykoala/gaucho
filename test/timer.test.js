"use strict";

const EventEmitter = require('events');
const taskTimer = require('../app/common/utils').timer;


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
        taskTimer(events, 1);
    });
});

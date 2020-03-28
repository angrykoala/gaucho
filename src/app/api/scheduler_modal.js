"use strict";

const InputAlert = require('./app_alerts').InputAlert;

class SchedulerAlert extends InputAlert {
    constructor(title, options = {}) {
        super(title, "", Object.assign({
            confirmButtonText: 'Schedule',
            input: 'number',
            inputPlaceholder: 'Seconds',
            inputAttributes: {
                min: 0
            }
        }, options));
    }
}

module.exports = function open(title) {
    return new SchedulerAlert(title).toggle();
};

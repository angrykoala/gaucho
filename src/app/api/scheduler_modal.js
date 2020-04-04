"use strict";

const swal = require('sweetalert2');

const InteractiveAlert = require('./app_alerts').InteractiveAlert;

// TODO: Improve this c**ppy code

class SchedulerAlert extends InteractiveAlert {
    constructor(title, options = {}) {
        super(title, Object.assign({
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Schedule'
        }, options));
    }
}

/* eslint-disable complexity*/
function isThereAnError(input) {
    if (input.hours < 0 || input.hours > 500) {
        return `Incorrect Value "${input.hours}" For Hours (must be less than 500)`;
    }

    if (input.minutes < 0 || input.minutes > 59) {
        return `Incorrect Value "${input.minutes}" For Minutes`;
    }

    if (input.seconds < 0 || input.seconds > 59) {
        return `Incorrect Value "${input.seconds}" For Seconds`;
    }
}
/* eslint-enable */

module.exports = function open(title) {
    return new SchedulerAlert(title, {
        preConfirm: () => {
            const res = {
                hours: Number(document.querySelector('.swal2-input.hours').value || 0),
                minutes: Number(document.querySelector('.swal2-input.minutes').value || 0),
                seconds: Number(document.querySelector('.swal2-input.seconds').value || 0),
                repeat: Boolean(document.querySelector('.swal2-checkbox').checked)
            };
            const errorMessage = isThereAnError(res);
            if (errorMessage) {
                swal.showValidationMessage(errorMessage);
                return false;
            }

            const totalSeconds = (res.hours * 3600) + (res.minutes * 60) + res.seconds;
            if (totalSeconds === 0) {
                swal.showValidationMessage('Please, fill at least one field');
                return false;
            }
            return {
                seconds: totalSeconds,
                repeat: res.repeat
            };
        }
    }).html(`
        <div class="time-input">
            <input min="0" max="500" class="swal2-input hours" placeholder="Hours" type="number" style="display: flex;">
            <input min="0" max="59" class="swal2-input minutes" placeholder="Minutes" type="number" style="display: flex;">
            <input min="0" max="59" class="swal2-input seconds" placeholder="Seconds" type="number" style="display: flex;">
        </div>
        <input type="checkbox" class="swal2-checkbox">
        <span class="swal2-label">Repeat</span>
        `).toggle();
};

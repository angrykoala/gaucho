"use strict";

const TaskStatus = require('../../common/task_status');

module.exports = {
    props: ['task'],
    template: `
    <div class="tooltip">
        <div class="tooltip-text">
            {{ status }}
        </div>
    </div>
    `,
    computed: {
        status() {
            switch (this.task.status) {
                case TaskStatus.idle:
                case TaskStatus.stopped:
                    return "Stopped";
                case TaskStatus.error:
                    return "Error";
                case TaskStatus.running:
                    return "Running";
                case TaskStatus.ok:
                    return "OK";
                default:
                    return this.task.status;
            }
        }
    }
};

"use strict";

const AppStatus = require('../app_status');

module.exports = {
    data() {
        return {
            AppStatus: AppStatus
        };
    },
    template: `
    <div class="bottom-bar">
        <nav class="navbar navbar-inverse">
            <div class="left-content">
                <b>Total Tasks:</b> {{AppStatus.totalTasks}}
            </div>
            <div class="right-content">
                <b>Running Tasks:</b> {{AppStatus.runningTasks}}
            </div>
        </nav>
    </div>
    `
};

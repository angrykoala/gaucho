"use strict";

const AppStatus = require('../app_status');

module.exports = {
    data() {
        return {
            AppStatus: AppStatus
        };
    },
    template: `
    <div class="bottombar">
        <nav class="navbar navbar-inverse">
             <div id="left">
                <b>Total Tasks:</b> {{AppStatus.totalTasks}}
            </div>
            <div id="right">
                <b>Running Tasks:</b> {{AppStatus.runningTasks}}
            </div>
    </nav> 
    </div>
    `
   
};
 

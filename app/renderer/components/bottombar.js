"use strict";

const AppStatus = require('../app_status');



module.exports = {
    
    props: ['suite'],    
    data() {
        return {
            AppStatus: AppStatus
        };
    },
    template: `
    <div class="bottombar">
        <nav class="navbar navbar-inverse">
             <div id="left">
                Total Tasks: 10
            </div>
            <div id="right">
                Running Tasks: 0
            </div>
    </nav> 
    </div>
    `,
   
};
 

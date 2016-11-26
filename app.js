"use strict";

const config = require('./app/config');
const meterialUpdate = require('./app/material_update');

const components = {
    "task-suite": require('./app/components/task_suite')
};

config.loadConfig((err, suites) => {
    if (err) console.error(err);
    const app = new Vue({
        el: '#app',
        data: {
            suites: suites
        },
        components: components,
        mounted() {
            meterialUpdate.updateCollapsible();
            meterialUpdate.updateTabs();
        }
    });
});

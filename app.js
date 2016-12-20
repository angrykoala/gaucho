"use strict";

const TaskConfig = require('./app/renderer/task_config');
const Material = require('./app/renderer/materialize');

const components = {
    "task-suite": require('./app/renderer/components/task_suite'),
    "navbar": require('./app/renderer/components/navbar')
};

TaskConfig.loadConfig((err, suites) => {
    if (err) console.error(err);
    const app = new Vue({ // jshint ignore:line
        el: '#app',
        data: {
            suites: suites
        },
        components: components,
        mounted() {
            Material.init();
        },
        updated() {
            this.$nextTick(() => {
                Material.init();
            });
        }
    });
});

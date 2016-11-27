"use strict";

const config = require('./app/config');
const Material = require('./app/materialize');

const components = {
    "task-suite": require('./app/components/task_suite'),
    "navbar": require('./app/components/navbar')
};

config.loadConfig((err, suites) => {
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

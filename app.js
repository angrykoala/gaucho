"use strict";

const TaskConfig = require('./app/renderer/task_config');
const Material = require('./app/renderer/materialize');

const components = {
    "task-suite": require('./app/renderer/components/task_suite'),
    "navbar": require('./app/renderer/components/navbar')
};

let suites = [];


const app = new Vue({ // jshint ignore:line
    el: '#app',
    data: {
        suites: suites,
        loaded: false
    },
    components: components,
    mounted() {
        Material.init();
        TaskConfig.loadConfig((err, s) => {
            this.suites = s;
            this.loaded = true;
        });
    },
    updated() {
        this.$nextTick(() => {
            Material.init();
        });
    }
});

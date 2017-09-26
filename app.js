"use strict";

const ipcRenderer = require('electron').ipcRenderer;

const TaskConfig = require('./app/renderer/task_config');
const AppStatus = require('./app/renderer/app_status');
const Material = require('./app/renderer/materialize');

const components = {
    "task-suite": require('./app/renderer/components/task_suite'),
    "navbar": require('./app/renderer/components/navbar'),
    "about": require('./app/renderer/components/about'),
    "bottom-bar": require('./app/renderer/components/bottom_bar'),
    "config-menu": require('./app/renderer/components/config_menu')
};

let suites = [];

ipcRenderer.on('before-close', () => {
    TaskConfig.saveConfig();
    const promises = suites.map((s) => {
        return s.stopAll();
    });
    Promise.all(promises).then(() => {
        ipcRenderer.send("close-app");
    });
});

const app = new Vue({ // jshint ignore:line
    el: '#app',
    data: {
        suites: suites,
        loaded: false,
        AppStatus: AppStatus
    },
    components: components,
    mounted() {
        Material.init();
        TaskConfig.loadConfig();
        this.suites = TaskConfig.suites;
        this.loaded = true;
    },
    updated() {
        this.$nextTick(() => {
            Material.init();
        });
    }
});

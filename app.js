"use strict";

const ipcRenderer = require('electron').ipcRenderer;

const TaskConfig = require('./app/renderer/task_config');
const Material = require('./app/renderer/materialize');

const AppStatus = require('./app/renderer/app_status');
const AppTimer = require('./app/renderer/timer');

const components = {
    "task-suite": require('./app/renderer/components/task_suite'),
    "navbar": require('./app/renderer/components/navbar')
};


let suites = [];

ipcRenderer.on('before-close', () => {
    const promises = suites.map((s) => {
        return s.stopAll();
    });
    promises.push(new Promise((resolve) => {
        TaskConfig.saveConfig(() => {
            resolve();
        });
    }));
    Promise.all(promises).then(() => {
        ipcRenderer.send("close-app");
    });
});

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
            if (err) console.error(err);
            suites = s;
            this.suites = suites;
            this.loaded = true;
            AppTimer(AppStatus.events);
        });
    },
    updated() {
        this.$nextTick(() => {
            Material.init();
        });
    }
});

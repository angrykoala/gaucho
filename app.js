/* globals Vue */
"use strict";

const ipcRenderer = require('electron').ipcRenderer;

const TasksHandler = require('./app/renderer/tasks_handler');
const AppStatus = require('./app/renderer/app_status');
const Material = require('./app/renderer/api/materialize');
const Shortcuts = require('./app/renderer/api/shortcuts');

const components = {
    "task-suite": require('./app/renderer/components/task_suite'),
    "navbar": require('./app/renderer/components/navbar'),
    "bottom-bar": require('./app/renderer/components/bottom_bar'),
    "config-menu": require('./app/renderer/components/config_menu')
};


ipcRenderer.on('before-close', () => {
    TasksHandler.saveTasks();
    const promises = TasksHandler.suites.map((s) => s.stopAll());
    Promise.all(promises).then(() => {
        ipcRenderer.send("close-app");
    });
});

const app = new Vue({ // eslint-disable-line no-unused-vars
    el: '#app',
    data: {
        suites: TasksHandler.suites,
        AppStatus: AppStatus
    },
    components: components,
    beforeMount() {
        TasksHandler.loadTasksFromConfig();
    },
    mounted() {
        Material.init();
        Shortcuts.init();
    },
    updated() {
        this.$nextTick(() => {
            Material.init();
        });
    }
});

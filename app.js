/* globals Vue */
"use strict";

const ipcRenderer = require('electron').ipcRenderer;
// Some heavy vuex magic happening here
// const Vuex = require('vuex'); // eslint-disable-line no-unused-vars

const TasksHandler = require('./app/renderer/tasks_handler');
const AppStatus = require('./app/renderer/app_status');
const Material = require('./app/renderer/api/materialize');
const Shortcuts = require('./app/renderer/api/shortcuts');

const store = require('./app/renderer/store');

const components = {
    "task-suite": require('./app/renderer/components/task_suite.vue'),
    "navbar": require('./app/renderer/components/navbar.vue'),
    "bottom-bar": require('./app/renderer/components/bottom_bar.vue'),
    "config-menu": require('./app/renderer/components/config_menu.vue')
};


ipcRenderer.on('before-close', () => {
    TasksHandler.saveTasks();
    const promises = TasksHandler.suites.map((s) => s.stopAll());
    Promise.all(promises).then(() => {
        ipcRenderer.send("close-app");
    });
});

// If magic is not happening, uncomment
// Vue.use(Vuex);

const app = new Vue({ // eslint-disable-line no-unused-vars
    el: '#app',
    data: {
        suites: TasksHandler.suites,
        AppStatus: AppStatus
    },
    components: components,
    store: store,
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

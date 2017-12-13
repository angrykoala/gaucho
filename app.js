"use strict";

const ipcRenderer = require('electron').ipcRenderer;
// Some heavy vuex magic happening here

const Vue = require('vue/dist/vue.common');
const Vuex = require('vuex'); // eslint-disable-line no-unused-vars
Vue.use(Vuex);

const Material = require('./app/renderer/api/materialize');
const Shortcuts = require('./app/renderer/api/shortcuts');

const store = require('./app/renderer/stores/main');

const components = {
    "config-menu": require('./app/renderer/components/config_menu.vue'),
    "task-suite": require('./app/renderer/components/task_suite.vue'),
    "navbar": require('./app/renderer/components/navbar.vue'),
    "bottom-bar": require('./app/renderer/components/bottom_bar.vue')
};


ipcRenderer.on('before-close', () => {
    store.dispatch("saveTasks");
    store.dispatch("stopAllTasks").then(() => {
        ipcRenderer.send("close-app");
    });
});


const app = new Vue({ // eslint-disable-line no-unused-vars
    el: '#app',
    components: components,
    store: store,
    beforeMount() {
        store.dispatch("loadTasks");
    },
    mounted() {
        Material.init();
        Shortcuts.init();
    },
    updated() {
        this.$nextTick(() => {
            Material.init();
        });
    },
    computed: {
        suites() {
            return this.$store.getters.suites;
        },
        showBottomBar() {
            return this.$store.state.userConfig.bottomBar;
        }
    }
});

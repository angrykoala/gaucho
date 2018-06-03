"use strict";

const ipcRenderer = require('electron').ipcRenderer;
// Some heavy vuex magic happening here

const Vue = require('vue/dist/vue.common');
const Vuex = require('vuex');
Vue.use(Vuex);

// const Material = require('./app/renderer/api/materialize');
// const Shortcuts = require('./app/renderer/api/shortcuts');

const store = require('./app/renderer/stores/main');

// const components = {
//     "config-menu": require('./app/renderer/pages/config_menu.vue'),
//     "task-suite": require('./app/renderer/components/task_suite.vue'),
//     "navbar": require('./app/renderer/components/navbar.vue'),
//     "bottom-bar": require('./app/renderer/components/bottom_bar.vue')
// };

const components = {
    "navbar": require('./app/renderer/components/navbar.vue'),
    "suite": require('./app/renderer/components/suite.vue'),
    "bottom-bar": require('./app/renderer/components/bottom_bar.vue'),
    "settings-menu": require('./app/renderer/components/settings_menu.vue')
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
    computed: {
        suites() {
            return this.$store.getters.suites;
        },
        showBottomBar() {
            return this.$store.state.userConfig.bottomBar && !this.settingsMenu;
        },
        showTopBar() {
            return !this.settingsMenu;
        },
        settingsMenu() {
            return this.$store.state.settingsMenu;
        },
        selectedSuite() {
            // return this.suite;
            return this.$store.state.tasks.selectedSuite;
        },
        editMode() {
            return this.$store.state.editMode;
        }
    },
    beforeMount() {
        store.dispatch("loadTasks");
    },
    mounted() {
        // Material.init();
        // Shortcuts.init();
    },
    updated() {
        this.$nextTick(() => {
            // Material.init();
        });
    }
});

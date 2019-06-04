"use strict";

const ipcRenderer = require('electron').ipcRenderer;

const Vue = require('vue/dist/vue.common');
const Vuex = require('vuex');
Vue.use(Vuex);

const Shortcuts = require('./api/shortcuts');
const ContextMenu = require('./api/context_menu');

const store = require('./store/main');
const AppAlerts = require('./api/app_alerts');
AppAlerts.init(store);
ContextMenu.init(store);

const components = {
    "navbar": require('./components/navbar/navbar.vue'),
    "suite": require('./components/suite/suite.vue'),
    "bottom-bar": require('./components/bottom_bar.vue'),
    "settings-menu": require('./components/settings/settings_menu.vue')
};

const themeMixin = require('./mixins/theme');

ipcRenderer.on('before-close', () => {
    store.dispatch("saveTasks");
    store.dispatch("stopAllTasks").then(() => {
        ipcRenderer.send("close-app");
    });
});

const app = new Vue({ // eslint-disable-line no-unused-vars
    el: '#app',
    components: components,
    mixins: [themeMixin],
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
        Shortcuts.init();
    }
});

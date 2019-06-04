"use strict";

const ipcRenderer = require('electron').ipcRenderer;

const Vue = require('vue/dist/vue.common');
const Vuex = require('vuex');
Vue.use(Vuex);

// const Shortcuts = require('./app/renderer/api/shortcuts');
// const ContextMenu = require('./app/renderer/api/context_menu');

const store = require('./store/main');
// const AppAlerts = require('./app/renderer/api/app_alerts');
// AppAlerts.init(store);
// ContextMenu.init(store);

// const components = {
//     "navbar": require('./app/renderer/components/navbar.vue'),
//     "suite": require('./app/renderer/components/suite.vue'),
//     "bottom-bar": require('./app/renderer/components/bottom_bar.vue'),
//     "settings-menu": require('./app/renderer/components/settings_menu.vue')
// };

// const themeMixin = require('./app/renderer/mixins/theme');

ipcRenderer.on('before-close', () => {
    store.dispatch("saveTasks");
    store.dispatch("stopAllTasks").then(() => {
        ipcRenderer.send("close-app");
    });
});

const app = new Vue({ // eslint-disable-line no-unused-vars
    el: '#app',
    // components: components,
    // mixins: [themeMixin],
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
    }
    // mounted() {
    //     Shortcuts.init();
    // }
});

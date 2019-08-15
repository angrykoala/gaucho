"use strict";

const Vuex = require('vuex');

const TaskStore = require('./task_store');
const ConfigStore = require('./config_store');

const version = require('../../../package.json').version;

module.exports = new Vuex.Store({
    modules: {
        userConfig: ConfigStore,
        tasks: TaskStore
    },
    state: {
        editMode: false,
        settingsMenu: false
    },
    getters: {
        version() {
            return version;
        }
    },
    mutations: {
        toggleEdit(state) {
            state.editMode = !state.editMode;
        },
        toggleSettings(state) {
            state.settingsMenu = !state.settingsMenu;
        }
    }
});

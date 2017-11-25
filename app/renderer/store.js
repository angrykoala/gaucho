"use strict";
const Vuex = require('vuex');
const TasksHandler = require('./tasks_handler');


module.exports = new Vuex.Store({
    state: {
        editMode: false,
        activeSuite: 0
    },
    getters: {

    },
    mutations: {
        toggleEdit(state) {
            state.editMode = !state.editMode;
            TasksHandler.saveTasks();
        },
        toggleActiveSuite(state, suite) {
            state.activeSuite = suite; // TODO: make checks
        }
    },
    actions: {


    }
});

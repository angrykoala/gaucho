"use strict";
const Vuex = require('vuex');
const TasksHandler = require('./tasks_handler');


module.exports = new Vuex.Store({
    state: {
        editMode: false
    },
    getters: {

    },
    mutations: {
        toggleEdit(state) {
            state.editMode = !state.editMode;
            TasksHandler.saveTasks();
        }
    },
    actions: {


    }
});

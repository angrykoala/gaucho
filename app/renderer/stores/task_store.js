"use strict";

// const Suite = require('../../common/suite');
const TasksHandler = require('../tasks_handler');
const TaskImporter = require('../../common/task_importer');

// const AppConfig = require('../../app_config.json');

module.exports = {
    state: {
        tasksHandler: TasksHandler,
        suites: []
    },
    getters: {
        suites(state) {
            return state.tasksHandler.suites;
        }
    },
    mutations: {
        addNewSuite(state, suite) {
            state.tasksHandler.addSuite(suite);
        },
        clearTasks(state) {
            state.tasksHandler.clearTasks();
        },
        resetTasks(state) {
            state.tasksHandler.clearTasks();
            state.tasksHandler.addDefaultSuite();
        }
    },
    actions: {
        saveTasks(context) {
            context.state.tasksHandler.saveTasks();
        },
        loadTasks(context) {
            context.state.tasksHandler.loadTasksFromConfig();
        },
        stopAllTasks(context) {
            const promises = context.state.tasksHandler.suites.map((s) => s.stopAll());
            return Promise.all(promises);
        },
        importTasks(context, filename) {
            return TaskImporter.import(filename).then((data) => {
                context.state.tasksHandler.loadTasksFromData(data);
            });
        },
        exportTasks(context, filename) {
            return TaskImporter.export(filename, context.getters.suites, context.getters.version);
        }
    }
};

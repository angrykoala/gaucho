"use strict";

const Suite = require('../../common/suite');
const Task = require('../../common/task');
const TasksHandler = require('../tasks_handler');
const TaskImporter = require('../../common/task_importer');

const AppConfig = require('../../app_config.json');

module.exports = {
    state: {
        suites: [],
        selectedSuite: 0,
        runningTasks: 0
    },
    getters: {
        suites(state) {
            return state.suites;
        },
        canAddSuite(state) {
            return state.suites.length < AppConfig.maxSuites;
        },
        maxTasksPerSuite() {
            return AppConfig.maxTasksPerSuite;
        },
        totalTasks(state) {
            return state.suites.reduce((total, s) => {
                return total + s.length;
            }, 0);
        },
        runningTasks(state) {
            return state.runningTasks;
        },
        currentSuite(state) {
            return state.suites[state.selectedSuite];
        }
    },
    mutations: {
        toggleActiveSuite(state, suite) {
            state.selectedSuite = suite; // TODO: make checks
        },
        increaseRunningTasks(state) {
            state.runningTasks++;
        },
        decreaseRunningTasks(state) {
            state.runningTasks--;
        },
        addSuite(state, suite) {
            if (state.suites.length < AppConfig.maxSuites) {
                if(!suite) {
                    suite = new Suite(`Suite ${(state.suites.length + 1)}`);
                }
                state.suites.push(suite);
            }
        },
        addTask(state, {index, task}) {
            if(state.suites[index].length < AppConfig.maxTasksPerSuite) {
                state.suites[index].addTask(task);
            }
        },
        updateTask(state, data) {
            const suite = state.suites[data.suite];
            suite.replaceTask(data.task, data.data);
        },
        deleteTask(state, data) {
            const suite = state.suites[data.suite];
            suite.removeTask(data.task);
        },
        renameSuite(state, data) {
            const suite = state.suites[data.suite];
            suite.title = data.title;
        },
        updateTasks(state, data) {
            const suite = state.suites[data.suite];
            suite.tasks = data.tasks;
        },
        validateTaskName(state, data) {
            const suite = state.suites[data.suite];
            const task = suite.tasks[data.task]; // todo: use a store
            if(suite.isDuplicate(task.title)) {
                task.title = suite.getValidName(task.title);
            }
        },
        _setSuites(state, suites) {
            state.suites.splice(0, state.suites.length);
            suites.forEach((suite) => {
                state.suites.push(suite);
            });
        },
        _deleteSuite(state, index) {
            let newSelected = Math.min(state.selectedSuite, state.suites.length - 2);
            if(state.suites.length === 1) {
                newSelected = 0;
                const suite = new Suite(`Suite 1`);
                state.suites.push(suite);
            }
            state.selectedSuite = newSelected;
            state.suites.splice(index, 1);
        }
    },
    actions: {
        saveTasks(context) {
            TasksHandler.saveTasks(context.getters.suites);
        },
        loadTasks(context) {
            const loadedSuites = TasksHandler.loadTasksFromConfig();
            context.commit("_setSuites", loadedSuites);
        },
        stopAllTasks(context) {
            const promises = context.getters.suites.map((s) => s.stopAll());
            return Promise.all(promises);
        },
        clearTasks(context) {
            return context.dispatch("stopAllTasks").then(() => {
                context.commit("_setSuites", [new Suite("Suite 1")]);
            });
        },
        importTasks(context, filename) {
            return TaskImporter.import(filename).then((data) => {
                const loadedSuites = TasksHandler.loadTasksFromData(data);
                return context.dispatch("stopAllTasks").then(() => {
                    context.commit("_setSuites", loadedSuites);
                    context.dispatch("saveTasks");
                });
            });
        },
        exportTasks(context, filename) {
            return TaskImporter.export(filename, context.getters.suites, context.getters.version);
        },
        runTask(context, index) {
            const task = context.getters.currentSuite.getTask(index);
            if(!task.isRunning()) {
                context.commit('increaseRunningTasks');
                task.run(() => {}, () => {
                    context.commit('decreaseRunningTasks');
                });
            }
        },
        stopTask(context, data) {
            let suite = context.getters.currentSuite;
            if(data.suite) suite = context.getters.suites[data.suite];
            const task = suite.getTask(data.task);
            task.stop();
        },
        runSuite(context) {
            const taskNumber = context.getters.currentSuite.length;
            for(let i = 0; i < taskNumber; i++) {
                context.dispatch("runTask", i);
            }
        },
        stopSuite(context, s) {
            const taskNumber = context.getters.suites[s].length;
            for(let i = 0; i < taskNumber; i++) {
                context.dispatch("stopTask", {
                    suite: s,
                    task: i
                });
            }
        },
        deleteSuite(context, i) {
            context.dispatch("stopSuite", i);
            context.commit("_deleteSuite", i);
        },
        duplicateTask(context, data) {
            const oldTask = context.getters.suites[data.suite].getTask(data.task);
            const newTask = new Task(oldTask.title, oldTask.path, oldTask.command);
            context.commit("addTask", {
                index: data.suite,
                task: newTask
            });
        }
    }
};

"use strict";

const Suite = require('../common/suite');
const TasksHandler = require('../api/tasks_handler');
const EnvVariableHandler = require('../api/env_variables_handler');
const TaskImporter = require('../common/task_importer');

const AppSettings = require('../../app_settings.json');

module.exports = {
    state: {
        suites: [],
        selectedSuite: 0,
        runningTasks: 0,
        globalEnv: []
    },
    getters: {
        suites(state) {
            return state.suites;
        },
        canAddSuite(state) {
            return state.suites.length < AppSettings.maxSuites;
        },
        maxTasksPerSuite() {
            return AppSettings.maxTasksPerSuite;
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
            if (state.suites.length < AppSettings.maxSuites) {
                if (!suite) {
                    suite = new Suite(`Suite ${(state.suites.length + 1)}`);
                }
                state.suites.push(suite);
            }
            TasksHandler.saveTasks(state.suites);
        },
        addTask(state, {index, task}) {
            if (state.suites[index].length < AppSettings.maxTasksPerSuite) {
                state.suites[index].addTask(task);
            }
            TasksHandler.saveTasks(state.suites);
        },
        updateTask(state, data) {
            const suite = state.suites[data.suite];
            suite.replaceTask(data.task, data.data);
            TasksHandler.saveTasks(state.suites);
        },
        deleteTask(state, data) {
            const suite = state.suites[data.suite];
            suite.removeTask(data.task);
            TasksHandler.saveTasks(state.suites);
        },
        renameSuite(state, data) {
            const suite = state.suites[data.suite];
            suite.setTitle(data.title);
        },
        updateSuiteTasks(state, data) {
            const suite = state.suites[data.suite];
            suite.tasks = data.tasks;
            TasksHandler.saveTasks(state.suites);
        },
        updateSuites(state, data) {
            state.suites = data;
            TasksHandler.saveTasks(state.suites);
        },
        validateTaskName(state, data) {
            const suite = state.suites[data.suite];
            const task = suite.tasks[data.task]; // todo: use a store
            if (suite.isDuplicate(task.title)) {
                task.title = suite.getValidTaskName(task.title);
            }
        },
        setGlobalEnv(state, data) {
            state.globalEnv = data;
        },
        _setSuites(state, suites) {
            state.suites.splice(0, state.suites.length);
            suites.forEach((suite) => {
                state.suites.push(suite);
            });
        },
        _deleteSuite(state, index) {
            let newSelected = Math.min(state.selectedSuite, state.suites.length - 2);
            if (state.suites.length === 1) {
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
        saveGlobalEnvVariables(context) {
            const variables = EnvVariableHandler.saveGlobalEnv(context.state.globalEnv);
            context.commit("setGlobalEnv", variables);
        },
        loadTasks(context) {
            const loadedSuites = TasksHandler.loadTasksFromConfig();
            context.commit("_setSuites", loadedSuites);
            const loadedGlobalEnv = EnvVariableHandler.loadGlobalEnvFromConfig();
            context.commit("setGlobalEnv", loadedGlobalEnv);
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

                if (data.globalEnv && data.globalEnv.length > 0) {
                    context.commit("setGlobalEnv", data.globalEnv);
                    context.dispatch("saveGlobalEnvVariables", data.globalEnv);
                }
                return context.dispatch("stopAllTasks").then(() => {
                    context.commit("_setSuites", loadedSuites);
                    context.dispatch("saveTasks");
                });
            });
        },
        importSuite(context, filename) {
            if (context.getters.canAddSuite) {
                return TaskImporter.import(filename).then((data) => {
                    const loadedSuites = TasksHandler.loadTasksFromData(data);
                    context.commit("addSuite", loadedSuites[0]);
                });
            }
        },
        exportTasks(context, filename) {
            return TaskImporter.export(filename, context.getters.suites, context.getters.version, context.state.globalEnv);
        },
        exportSuite(context, {filename, suiteIndex}) {
            const suite = context.getters.suites[suiteIndex];
            return TaskImporter.export(filename, [suite], context.getters.version);
        },
        duplicateSuite(context, index) {
            if (context.getters.canAddSuite) {
                const suite = context.getters.suites[index];
                context.commit("addSuite", suite.clone());
            }
        },
        runTask(context, index) {
            const task = context.getters.currentSuite.getTask(index);
            const globalEnv = context.state.globalEnv;
            if (!task.isRunning() && !task.isScheduled()) {
                context.commit('increaseRunningTasks');
                task.run(globalEnv, () => {
                    context.commit('decreaseRunningTasks');
                });
            }
        },
        scheduleTask(context, data) {
            const task = context.getters.currentSuite.getTask(data.index);
            const scheduleOptions = {
                seconds: data.seconds,
                repeat: data.repeat
            };

            task.schedule(scheduleOptions, () => {
                context.commit('increaseRunningTasks'); // On Run
            }, () => {
                context.commit('decreaseRunningTasks'); // On Completed
            });
        },
        stopTask(context, data) {
            let suite = context.getters.currentSuite;
            if (data.suite) suite = context.getters.suites[data.suite];
            const task = suite.getTask(data.task);
            task.stop();
        },
        runSuite(context) {
            const taskNumber = context.getters.currentSuite.length;
            for (let i = 0; i < taskNumber; i++) {
                context.dispatch("runTask", i);
            }
        },
        scheduleSuite(context, options) {
            const taskNumber = context.getters.currentSuite.length;
            for (let i = 0; i < taskNumber; i++) {
                context.dispatch("scheduleTask", {
                    index: i,
                    seconds: options.seconds,
                    repeat: options.repeat
                });
            }
        },
        stopSuite(context, s) {
            const taskNumber = context.getters.suites[s].length;
            for (let i = 0; i < taskNumber; i++) {
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
            const task = context.getters.suites[data.suite].getTask(data.task);
            context.commit("addTask", {
                index: data.suite,
                task: task.clone()
            });
        }
    }
};

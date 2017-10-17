"use strict";

const EventEmitter = require('events');

const TasksHandler = require('./tasks_handler');
const version = require('../../package.json').version;
const AppConfigStatus = require('./app_config_status');

module.exports = {
    editMode: false,
    activeSuite: 0,
    events: new EventEmitter(),
    toggleEdit() {
        this.editMode = !this.editMode;
        TasksHandler.saveTasks();
    },
    config: new AppConfigStatus(),
    maxSuites: 6,
    maxTasksPerSuite: 8,
    totalTasks: 0,
    runningTasks: 0,
    version: version,
    currentContextMenu: null,
    openContextMenu: function (menu, event) {
        if (this.currentContextMenu !== null) {
            this.currentContextMenu.$el.style.display = 'none';
        }
        this.currentContextMenu = menu;
        let menuElement = menu.$el;
        menuElement.style.left = `${event.clientX}px`;
        menuElement.style.top = `${event.clientY}px`;
        menuElement.style.display = "block";
        event.preventDefault();
    }
};

"use strict";

const EventEmitter = require('events');

const TaskConfig = require('./task_config');
const version = require('../../package.json').version;
const AppConfigStatus = require('./app_config_status');

module.exports = {
    editMode: false,
    activeSuite: 0,
    events: new EventEmitter(),
    toggleEdit() {
        this.editMode = !this.editMode;
        TaskConfig.saveTasks();
    },
    config: new AppConfigStatus(),
    maxSuites: 6,
    maxTasksPerSuite: 8,
    totalTasks: 0,
    runningTasks: 0,
    version: version,
    contextMenuEl: null,
    openContextMenu: function (el, event) {
        // todo maybe move this check into individual components so that it isn't a requirement of all menus?
        // the only reason it's needed is because draggable is interfering with task_card context menu clicks
        if (!this.editMode) {
            if (this.contextMenuEl != null) {
                this.contextMenuEl.style.display = 'none';
            }
            this.contextMenuEl = el;
            this.contextMenuEl.style.left = event.clientX + "px";
            this.contextMenuEl.style.top = event.clientY + "px";
            this.contextMenuEl.style.display = "block";
            event.preventDefault();
        }
    }
};

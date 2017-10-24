"use strict";

const AppStatus=require('../app_status');
const TasksHandler=require('../tasks_handler');
const EventEmitter = require('events');
const GauchoEvents = new EventEmitter(); //EventEmitter singleton

module.exports = class GauchoActions {
    static on(name, handler) {
        GauchoEvents.on(name, handler);
    }

    static toggleEdit() {
        AppStatus.editMode = !AppStatus.editMode;
        TasksHandler.saveTasks();
    }

    static toggleAbout() {
        GauchoEvents.emit('toggle-about');
    }

    static toggleConfig() {
        GauchoEvents.emit('toggle-config');
    }
};

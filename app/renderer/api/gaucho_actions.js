"use strict";

const AppStatus=require('../app_status');
const TasksHandler=require('../tasks_handler');

module.exports = class GauchoActions {
    static toggleEdit() {
        AppStatus.editMode = !AppStatus.editMode;
        TasksHandler.saveTasks();
    }
};

"use strict";

const Mousetrap = require('mousetrap');

const AppStatus = require('../app_status');
const GauchoActions = require('./gaucho_actions');
const Material = require('./materialize');
const TasksHandle = require('../tasks_handler');

// Methods interface with jQuery
module.exports = {
    init() {
        this.changeTabForward();
        this.changeTabBack();
        this.toggleEdit();
        this.toggleNavBarMenu();
    },
    setSuite(add = true) {
        let newIndex = 0
        const totalTabs = TasksHandle.suites.length - 1

        if (add && AppStatus.activeSuite !== totalTabs) {
            newIndex = AppStatus.activeSuite + 1
        } else if (!add) {
            newIndex = AppStatus.activeSuite === 0
                ? totalTabs
                : AppStatus.activeSuite - 1
        }

        Material.selectTab("#navbar-tabs", `tab${newIndex}`);
        GauchoActions.toggleActiveSuite(newIndex);
    },
    changeTabForward() {
        Mousetrap.bind('ctrl+tab', () => this.setSuite());
    },
    changeTabBack() {
        Mousetrap.bind('ctrl+shift+tab', () => this.setSuite(false));
    },
    toggleEdit() {
        Mousetrap.bind('ctrl+e', () => GauchoActions.toggleEdit());
    },
    toggleNavBarMenu() {
        Mousetrap.bind('ctrl+m', () => Material.toggleNavBarMenu());
    }
};

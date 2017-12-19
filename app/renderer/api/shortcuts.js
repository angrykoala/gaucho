"use strict";

const Mousetrap = require('mousetrap');

const Store = require('../stores/main');
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
        let newIndex = 0;
        const totalTabs = TasksHandle.suites.length - 1;
        const activeSuite = Store.state.activeSuite;

        if (add && activeSuite !== totalTabs) {
            newIndex = activeSuite + 1;
        } else if (!add) {
            newIndex = activeSuite === 0 ? totalTabs : activeSuite - 1;
        }

        Material.selectTab("#navbar-tabs", `tab${newIndex}`);
        Store.commit("toggleActiveSuite", newIndex);
    },
    changeTabForward() {
        Mousetrap.bind('ctrl+tab', () => this.setSuite());
    },
    changeTabBack() {
        Mousetrap.bind('ctrl+shift+tab', () => this.setSuite(false));
    },
    toggleEdit() {
        Mousetrap.bind('ctrl+e', () => {
            Store.commit("toggleEdit");
        });
    },
    toggleNavBarMenu() {
        Mousetrap.bind('ctrl+m', () => Material.toggleNavBarMenu());
    }
};

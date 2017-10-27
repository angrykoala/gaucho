/* globals $ */
"use strict";

const Mousetrap = require('mousetrap');

const AppStatus = require('../app_status');
const GauchoActions = require('./gaucho_actions');
const Material = require('./materialize');

// Methods interface with jQuery
module.exports = {
    init() {
        this.changeTabForward();
        this.changeTabBack();
        this.toggleEdit();
        this.toggleNavBarMenu();
    },
    changeTabForward() {
        Mousetrap.bind('ctrl+tab', () => {
            const totalTabs = Material.getLengthNavBarTabs() - 1
            const newIndex = AppStatus.activeSuite === totalTabs
                ? 0
                : AppStatus.activeSuite + 1

            Material.selectTab("#navbar-tabs", `tab${newIndex}`);
            GauchoActions.toggleActiveSuite(newIndex);
        });
    },
    changeTabBack() {
        Mousetrap.bind('ctrl+shift+tab', () => {
            const totalTabs = Material.getLengthNavBarTabs()
            const newIndex = AppStatus.activeSuite === 0
                ? totalTabs - 1
                : AppStatus.activeSuite - 1

            Material.selectTab("#navbar-tabs", `tab${newIndex}`);
            GauchoActions.toggleActiveSuite(newIndex);
        });
    },
    toggleEdit() {
        Mousetrap.bind('ctrl+e', () => GauchoActions.toggleEdit());
    },
    toggleNavBarMenu() {
        Mousetrap.bind('ctrl+m', () => Material.toggleNavBarMenu());
    }
};

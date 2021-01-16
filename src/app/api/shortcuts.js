"use strict";

const Mousetrap = require('mousetrap');

const Store = require('../store/main');
const EventHandler = require('../event_handler');

// Methods interface with jQuery
module.exports = {
    init() {
        this.changeTabForward();
        this.changeTabBack();
        this.toggleEdit();
        this.toggleNavBarMenu();
        this.toggleSettings();
    },
    setSuite(add = true) {
        let newIndex = 0;
        const totalTabs = Store.getters.suites.length - 1;
        const activeSuite = Store.state.tasks.selectedSuite;

        if (add && activeSuite !== totalTabs) {
            newIndex = activeSuite + 1;
        } else if (!add) {
            newIndex = activeSuite === 0 ? totalTabs : activeSuite - 1;
        }

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
        Mousetrap.bind('ctrl+m', () => EventHandler.emit("showNavbarMenu"));
    },
    toggleSettings() {
        Mousetrap.bind('ctrl+s', () => {
            if (Store.state.settingsMenu) {
                // TODO: make save settings in an unique place if possible
                Store.dispatch("saveGlobalEnvVariables");
            }

            Store.commit("toggleSettings");
        });
    }
};

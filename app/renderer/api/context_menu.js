"use strict";
const remote = require('electron').remote;
const {Menu, MenuItem} = remote;

const EventEmitter = require('events');

let store = null;

const aboutModal = require('./about_modal');
const AppAlerts = require('./app_alerts');

class ContextMenu extends EventEmitter {
    constructor(items) {
        super();
        this.extraData = null;
        this.menu = new Menu();
        for(const item of items) {
            const event = item.event || item.label;
            const menuItem = new MenuItem({
                label: item.label,
                click: () => {
                    this.emit(event, this.extraData);
                },
                type: item.type || "normal"
            });
            this.menu.append(menuItem);
        }
    }

    toggle(extraData) {
        if(extraData !== undefined) this.extraData = extraData;
        this.menu.popup({window: remote.getCurrentWindow(), callback: () => {
            this.emit("close", this.extraData);
            this.removeAllListeners();
        }});
    }
}

class DefaultContextMenu extends ContextMenu {
    constructor(extraOptions = []) {
        super(extraOptions.concat([
            {label: "Settings", event: "settings"},
            {label: "About", event: "about"}
        ]));
    }

    toggle(extraData) {
        this.on("settings", () => {
            store.commit("toggleSettings");
        });
        this.on("about", () => {
            aboutModal(store);
        });

        super.toggle(extraData);
    }
}

class TabMenu extends DefaultContextMenu {
    constructor() {
        super([
            {label: "Delete", event: "delete"},
            {label: "Rename", event: "rename"},
            {type: "separator"}
        ]);
    }
}

class CardMenu extends DefaultContextMenu {
    constructor(task) {
        let runStopItem = {
            label: "Run",
            event: "run"
        };
        if(task.isRunning()) {
            runStopItem = {
                label: "Stop",
                event: "stop"
            };
        }
        super([
            runStopItem,
            {label: "Delete", event: "delete"},
            {type: "separator"}
        ]);
    }
}

module.exports = {
    init(vueStore) {
        store = vueStore;
        const defaultMenu = new DefaultContextMenu();

        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if(!AppAlerts.isVisible())
                defaultMenu.toggle();
        }, false);
    },
    TabMenu,
    CardMenu
};

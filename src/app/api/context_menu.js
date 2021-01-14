"use strict";
const {remote} = require('electron');

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
        for (const item of items) {
            const event = item.event;
            const menuItem = new MenuItem({
                label: item.label,
                click: event ? () => {
                    this.emit(event, this.extraData);
                } : undefined,
                type: item.type || "normal",
                role: item.role
            });
            this.menu.append(menuItem);
        }
    }

    toggle(extraData) {
        if (extraData !== undefined) this.extraData = extraData;
        this.menu.popup({window: remote.getCurrentWindow(),
            callback: () => {
                this.emit("close", this.extraData);
                this.removeAllListeners();
            }});
    }
}

class DefaultContextMenu extends ContextMenu {
    constructor(extraOptions = []) {
        super(extraOptions.concat([{
            label: "Cut",
            role: "cut"
        }, {
            label: "Copy",
            role: "copy"
        }, {
            label: "Paste",
            role: "paste"
        }, {
            type: "separator"
        }, {
            label: "Settings",
            event: "settings"
        }, {
            label: "About",
            event: "about"
        }, {
            label: "Quit",
            role: "quit"
        }]));
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
        super([{label: "Delete",
            event: "delete"}, {label: "Rename",
            event: "rename"}, {label: "Export Suite",
            event: "export-suite"}, {label: "Duplicate Suite",
            event: "duplicate-suite"}, {type: "separator"}]);
    }
}

class CardMenu extends DefaultContextMenu {
    constructor(task) {
        const items = [];
        if (task.isRunning() || task.isScheduled()) {
            items.push({
                label: "Stop",
                event: "stop"
            });
        } else {
            items.push({
                label: "Run",
                event: "run"
            });
            items.push({
                label: "Schedule",
                event: "schedule"
            });
        }
        super(items.concat([{
            label: "Delete",
            event: "delete"}, {
            label: "Duplicate",
            event: "duplicate"
        }, {
            type: "separator"
        }]));
    }
}

module.exports = {
    init(vueStore) {
        store = vueStore;
        const defaultMenu = new DefaultContextMenu();

        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (!AppAlerts.isVisible())
                defaultMenu.toggle();
        }, false);
    },
    TabMenu,
    CardMenu
};

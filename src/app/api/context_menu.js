"use strict";
const remote = require('@electron/remote');
const ipcRenderer = require('electron').ipcRenderer;
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
                role: item.role,
                sublabel: item.sublabel
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
    constructor(extraOptions = [], includeEditFields = true) {
        const editableFields = [{
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
        }];

        const baseFields = [{
            label: "Settings",
            event: "settings"
        }, {
            label: "About",
            event: "about"
        }, {
            label: "Quit",
            event: "quit"
        }];

        const fields = includeEditFields ? editableFields.concat(baseFields) : baseFields;

        super(extraOptions.concat(fields));
    }

    toggle(extraData) {
        this.on("settings", () => {
            store.commit("toggleSettings");
        });
        this.on("about", () => {
            aboutModal(store);
        });

        this.on("quit", () => {
            ipcRenderer.send("close-app");
        });
        super.toggle(extraData);
    }
}

class TabMenu extends DefaultContextMenu {
    constructor(suiteTitle) {
        super([{
            label: `Run "${suiteTitle}"`,
            event: "run-suite"
        }, {
            label: "Stop Suite",
            event: "stop-suite"
        }, {
            label: "Schedule",
            event: "schedule-suite"
        }, {type: "separator"}, {
            label: "Delete",
            event: "delete"
        }, {
            label: "Rename",
            event: "rename"
        }, {
            label: "Export",
            event: "export-suite"
        }, {
            label: "Duplicate",
            event: "duplicate-suite"
        }, {type: "separator"}], false);
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
            event: "delete"
        }, {
            label: "Duplicate",
            event: "duplicate"
        }, {
            label: "Copy Command",
            event: "copy-command"
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

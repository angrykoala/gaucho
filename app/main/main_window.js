"use strict";

const {
    BrowserWindow,
} = require('electron');

const AppConfig = require('../common/app_config');


module.exports = class MainWindow {
    constructor() {
        this.win = null;
        this.iconPath = null;
        this.indexPath = null;
        this.userConfig = new AppConfig.User();
    }

    setIcon(path) {
        this.iconPath = path;
        return this;
    }

    setIndex(htmlFile) {
        this.indexPath = htmlFile;
        return this;
    }

    initWindow(devWindow) {
        let win;
        const windowSize = this.userConfig.get("windowSize");

        let winConfig = {
            width: windowSize[0],
            height: windowSize[1],
            minWidth: 365,
            minHeight: 300,
            fullscreenable: false,
            webgl: false,
            icon: this.iconPath,
            frame: true
        };
        if (devWindow) {
            winConfig.width += this.userConfig.get("devToolsSize");
        }

        win = new BrowserWindow(winConfig);
        win.setMenu(null);

        win.loadURL(this.indexPath);

        if (devWindow) win.webContents.openDevTools();

        if (this.userConfig.get("maximized") === true) {
            win.maximize();
        }

        win.on('resize', () => {
            if (this.userConfig.get("maximized") !== true) {
                let size = win.getSize();
                if (devWindow) size[0] -= this.userConfig.get("devToolsSize");
                this.userConfig.set("windowSize", size);
            }
        });

        win.on('maximize', () => {
            this.userConfig.set("maximized", true);
        });

        win.on('unmaximize', () => {
            this.userConfig.set("maximized", false);
        });

        let first = true;
        win.on('close', (ev) => {
            if (first) {
                ev.preventDefault();
                win.webContents.send('before-close');
                first = false;
            }
        });
        win.on('closed', () => {
            win = null;
        });

        return win;
    }
};

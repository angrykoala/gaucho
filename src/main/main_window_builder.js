"use strict";

const {
    BrowserWindow
} = require('electron');

const AppConfig = require('../common/app_config');

module.exports = class MainWindowBuilder {
    constructor() {
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
        const windowSize = this.userConfig.get(AppConfig.FIELDS.WINDOW_SIZE);

        const winConfig = {
            width: windowSize[0],
            height: windowSize[1],
            minWidth: 400,
            minHeight: 300,
            fullscreenable: false,
            webgl: false,
            icon: this.iconPath,
            frame: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            }
        };
        if (devWindow) {
            winConfig.width += this.userConfig.get(AppConfig.FIELDS.DEVTOOLS_SIZE);
            // require('vue-devtools').install();
        }
        win = new BrowserWindow(winConfig);
        win.removeMenu();
        win.setMenuBarVisibility(false);

        win.loadURL(this.indexPath);

        if (devWindow) win.webContents.openDevTools();

        if (this.userConfig.get(AppConfig.FIELDS.MAXIMIZED) === true) {
            win.maximize();
        }

        win.on('resize', () => {
            if (this.userConfig.get(AppConfig.FIELDS.MAXIMIZED) !== true) {
                const size = win.getSize();
                if (devWindow) size[0] -= this.userConfig.get(AppConfig.FIELDS.DEVTOOLS_SIZE);
                this.userConfig.set(AppConfig.FIELDS.WINDOW_SIZE, size);
            }
        });

        win.on('maximize', () => {
            this.userConfig.set(AppConfig.FIELDS.MAXIMIZED, true);
        });

        win.on('unmaximize', () => {
            this.userConfig.set(AppConfig.FIELDS.MAXIMIZED, false);
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

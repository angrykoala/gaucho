"use strict";

const {
    BrowserWindow,
} = require('electron');

const UserConfig = require('./user_config');


module.exports = class MainWindow {
    constructor() {
        this.win = null;
        this.config = {};
    }

    setIcon(path) {
        this.config.iconPath = path;
        return this;
    }

    setIndex(htmlFile) {
        this.config.indexPath = htmlFile;
        return this;
    }

    setUserConfig(userConfig) {
        this.config.userConfig = userConfig;
        return this;
    }

    initWindow(devWindow) {
        let win;
        const config = this.config.userConfig;

        if (!config.windowSize) config.windowSize = [500, 600]; //TODO: use default
        let winConfig = {
            width: config.windowSize[0],
            height: config.windowSize[1],
            minWidth: 365,
            minHeight: 300,
            fullscreenable: false,
            webgl: false,
            icon: this.config.iconPath,
            frame: true
        };
        if (devWindow) {
            winConfig.width += config.devToolsSize;
        }

        win = new BrowserWindow(winConfig);
        win.userConfig = config;
        win.setMenu(null);

        win.loadURL(this.config.indexPath);

        if (devWindow) win.webContents.openDevTools();

        if (UserConfig.config.maximized === true) {
            win.maximize();
        }

        win.on('resize', () => {
            if (UserConfig.config.maximized !== true) {
                let size = win.getSize();
                if (devWindow) size[0] -= config.devToolsSize;
                UserConfig.config.windowSize = size;
            }
        });

        win.on('maximize', () => {
            UserConfig.config.maximized = true;
        });

        win.on('unmaximize', () => {
            UserConfig.config.maximized = false;
        });

        let first = true;
        win.on('close', (ev) => {
            if (first) {
                ev.preventDefault();
                UserConfig.saveConfig(() => {
                    win.webContents.send('before-close');
                    first = false;
                });
            }
        });
        win.on('closed', () => {
            win = null;
        });

        this.clearConfig();
        return win;
    }

    clearConfig() {
        this.config = {};
    }
};

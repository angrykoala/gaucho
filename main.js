"use strict";

const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron');
const path = require('path');

const UserConfig = require('./app/main/user_config');


function isDevEnv() {
    return process.env.NODE_ENV === "dev";
}

ipcMain.on('close-app', () => {
    app.quit();
});

//Global reference to window
let win;

function createWindow() {
    const iconPath = path.join(__dirname, 'resources', 'icon.png');

    UserConfig.loadConfig((config) => {
        if (!config.windowSize) config.windowSize = [500, 600]; //TODO: use default
        let winConfig = {
            width: config.windowSize[0],
            height: config.windowSize[1],
            minWidth: 200,
            minHeight: 300,
            webgl: false,
            icon: iconPath
        };
        if (isDevEnv()) {
            winConfig.width += config.devToolsSize;
        }

        win = new BrowserWindow(winConfig);
        win.userConfig = config;

        win.loadURL(`file://${__dirname}/index.html`);


        if (isDevEnv()) win.webContents.openDevTools();

        win.on('resize', () => {
            let size = win.getSize();
            if (isDevEnv()) size[0] -= config.devToolsSize;
            UserConfig.config.windowSize = size;
        });
        let first = true;
        win.on('close', (ev) => {
            win.webContents.send('before-close');
            if (first) ev.preventDefault();
            first = false;
        });
        win.on('closed', () => {
            win = null;
            UserConfig.saveConfig(() => {});
        });
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    //For macOS
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    //FOR macOS
    if (win === null) {
        createWindow();
    }
});

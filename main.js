"use strict";

const {
    app,
    BrowserWindow
} = require('electron');
const path = require('path');

const UserConfig = require('./app/main/userConfig');


function isDevEnv() {
    return process.env.NODE_ENV === "dev";
}

//Global reference to window
let win;


function createWindow() {
    const iconPath = path.join(__dirname, 'resources', 'icon.png');

    UserConfig.loadConfig((config) => {
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
            UserConfig.config.windowSize = win.getSize();
        });
        win.on('closed', () => {
            win = null;
        });
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    UserConfig.saveConfig(() => {
        //For macOS
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
});

app.on('activate', () => {
    //FOR macOS
    if (win === null) {
        createWindow();
    }
});

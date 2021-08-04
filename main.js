"use strict";

const path = require('path');
const url = require('url');

const MainWindowBuilder = require('./src/main/main_window_builder');
const appEvents = require('./src/main/app_events');
const utils = require('./src/common/utils');

const {
    app
} = require('electron');
require('@electron/remote/main').initialize()
// Global reference to window
let win = null;

function initApp() {
    function createWindow() {
        if (win === null) {
            const iconPath = path.join(__dirname, 'resources', 'icon.png');
            const htmlUrl = url.format({
                pathname: path.join(__dirname, 'public', 'index.html'),
                protocol: 'file:'
            });

            win = new MainWindowBuilder()
                .setIcon(iconPath)
                .setIndex(htmlUrl)
                .initWindow(utils.isDevEnv());
        }
    }
    appEvents(createWindow);
}

app.disableHardwareAcceleration(); // fixes drag images freezes
app.commandLine.appendSwitch('force-color-profile', 'srgb'); // Fixes messed up color rendering
app.allowRendererProcessReuse = true; // Default from electron 9, explicitly set to remove warning

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    console.warn("An instance of Gaucho is already running");
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // If command line is being executed while gaucho is running, this callback will be called
        // commandLine Array of commands [ './gaucho', 'caca' ]
        //         in development
        //         Command [
        //   '/home/angrykoala/Git/gaucho/node_modules/electron/dist/electron',
        //   '.'
        // ]


        // Someone tried to run a second instance, we should focus our window.
        if (win) {
            if (win.isMinimized()) win.restore();
            win.focus();
        }
    });


    initApp();
}

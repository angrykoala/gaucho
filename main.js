"use strict";

const path = require('path');
const url = require('url');

const MainWindow = require('./app/main/main_window');
const appEvents = require('./app/main/app_events');
const utils = require('./app/common/utils');

// Global reference to window
let win = null;

function initApp() {
    function createWindow() {
        if (win === null) {
            const iconPath = path.join(__dirname, 'resources', 'icon.png');
            const htmlUrl = url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:'
            });

            win = new MainWindow()
                .setIcon(iconPath)
                .setIndex(htmlUrl)
                .initWindow(utils.isDevEnv());
        }
    }
    appEvents(createWindow);
}

initApp();

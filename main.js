"use strict";

const path = require('path');

const MainWindow = require('./app/main/main_window');
const AppEvents = require('./app/main/app_events');
const { isDevEnv } = require('./app/common/utils');

//Global reference to window
let win = null;

function initApp() {
    function createWindow() {
        if (win === null) {
            const iconPath = path.join(__dirname, 'resources', 'icon.png');
            const htmlUrl = "file://" + __dirname + "/index.html";

            win = new MainWindow()
                .setIcon(iconPath)
                .setIndex(htmlUrl)
                .initWindow(isDevEnv());
        }
    }
    AppEvents(createWindow);
}

initApp();

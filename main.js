"use strict";

const path = require('path');

const MainWindow = require('./app/main/main_window');
const AppEvents = require('./app/main/app_events');
const UserConfig = require('./app/main/user_config');


function isDevEnv() {
    return process.env.NODE_ENV === "dev";
}

//Global reference to window
let win = null;

function initApp() {

    function createWindow() {
        if (win === null) {
            const iconPath = path.join(__dirname, 'resources', 'icon.png');
            const htmlUrl = "file://" + __dirname + "/index.html";

            UserConfig.loadConfig((config) => {
                win = new MainWindow()
                .setIcon(iconPath)
                .setIndex(htmlUrl)
                .setUserConfig(config)
                .initWindow(isDevEnv());
            });
        }
    }
    AppEvents(createWindow);

}

initApp();

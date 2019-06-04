"use strict";

const {
    app,
    ipcMain
} = require('electron');

module.exports = function(onReadyCallback) {

    ipcMain.on('close-app', () => {
        app.quit();
    });

    app.on('ready', () => {
        onReadyCallback();
    });

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // For macOS
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // FOR macOS
        onReadyCallback();
    });

};

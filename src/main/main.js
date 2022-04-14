"use strict";
// Main Electron process
exports.__esModule = true;
var electron_1 = require("electron");
var path_1 = require("path");
var indexHtmlFile = path_1["default"].join(__dirname, "../public/index.html");
function createWindow() {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1["default"].join(__dirname, "..", 'preload.js')
        }
    });
    win.loadFile(indexHtmlFile);
}
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});

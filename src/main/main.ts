// Main Electron process

import { app, BrowserWindow } from 'electron';
import path from 'path';

const indexHtmlFile = path.join(__dirname, "../public/index.html");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "..", 'preload.js')
        }
    })
    win.loadFile(indexHtmlFile)
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

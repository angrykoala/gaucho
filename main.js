"use strict";

const {app, BrowserWindow} = require('electron');

//Global reference to window
let win;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600});

  win.loadURL(`file://${__dirname}/index.html`);

 //Comment to remove devTools
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
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

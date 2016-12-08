"use strict";

const {app, BrowserWindow} = require('electron');

const config=require('./config.json');

function isDevEnv(){
    return process.env.NODE_ENV==="dev";
}

//Global reference to window
let win;

function createWindow () {
    let winSize={
        width: config.windowSize[0],
        height: config.windowSize[1]
    };
    if(isDevEnv()){
        winSize.width+=config.devToolsSize;
    }
    
  win = new BrowserWindow(winSize);

  win.loadURL(`file://${__dirname}/index.html`);

 //Comment to remove devTools
 if(isDevEnv()) win.webContents.openDevTools();

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

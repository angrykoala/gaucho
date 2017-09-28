"use strict";

const Store = require('electron-store');


const defaultData = {
    windowSize: [500, 600],
    devToolsSize: 300,
    outputMaxSize: 10000,
    maximized: false,
    bottomBar: true,
    configMenu: false,
    animatedSpinner: true,
};


// Just for basic offuscation of the config file
const key = "ro64wz3l7d";

module.exports = class AppConfig {
    constructor() {
        this.store = new Store({
            name: "gaucho_config",
            defaults: defaultData,
            encryptionKey: key
        });
    }

    set(key, value) {
        this.store.set(key, value);
    }
    get(key) {
        const result = this.store.get(key);
        return result;
    }
};

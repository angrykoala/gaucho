"use strict";

const Store = require('electron-store');
const { isDevEnv } = require('./utils');

const defaultData = {
    windowSize: [500, 600],
    devToolsSize: 300,
    outputMaxSize: 10000,
    maximized: false,
    bottomBar: true,
    animatedSpinner: true,
};


// Just for basic offuscation of the config file
const key = "ro64wz3l7d";

module.exports = class AppConfig {
    constructor() {
        const configName = isDevEnv() ? "gaucho_dev_config" : "gaucho_config";
        this.store = new Store({
            name: configName,
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

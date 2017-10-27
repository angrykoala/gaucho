"use strict";

const Store = require('electron-store');
const utils = require('./utils');

const FIELDS = {
    WINDOW_SIZE: "windowSize",
    DEVTOOLS_SIZE: "devToolsSize",
    MAXIMIZED: "maximized"
};

const defaultUserConfig = {
    windowSize: [500, 600],
    devToolsSize: 300,
    outputMaxSize: 10000,
    maximized: false,
    bottomBar: true,
    animatedSpinner: true,
    firstVisit: false,
    showTimer: true
};

const defaultTasks = {
    suites: [{
        title: "My Project",
        tasks: [{
            title: "Install",
            command: "npm install"
        }, {
            title: "Test",
            command: "npm test"
        }, {
            title: "Another awesome task",
            command: "echo 'The result of my awesome task'"

        }, {
            title: "Start",
            command: "npm start"

        }]
    }, {
        title: "Suite 2",
        tasks: [{
            title: "Hello World 2",
            command: "echo 'hello world'"
        }]
    }]
};

// Just for basic offuscation of the config file
const defaultKey = "ro64wz3l7d";

class AppConfig {
    constructor(configName, key, defaultData = {}) {
        if (utils.isDevEnv()) configName += "_dev";
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
}

class UserConfig extends AppConfig {
    constructor() {
        super("gaucho_config", defaultKey, defaultUserConfig);
    }
}
class TasksConfig extends AppConfig {
    constructor() {
        super("gaucho_tasks", defaultKey, defaultTasks);
    }
}

module.exports = {
    FIELDS,
    User: UserConfig,
    Tasks: TasksConfig
};

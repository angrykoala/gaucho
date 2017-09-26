"use strict";

const fs = require('fs');
const path = require('path');

const configFile = "../../config.json";

const defaultConfig = {
    windowSize: [500, 600],
    devToolsSize: 300,
    outputMaxSize: 10000,
    maximized: false,
    bottomBar: true,
    animatedSpinner: true,
    systemWindow: true
};

module.exports = {
    config: null,

    loadConfig(done) {
        fs.readFile(path.join(__dirname, configFile), 'utf8', (err, data) => {
            if (err) {
                console.warn("config.json file not found");
                this.config = defaultConfig;
                if (done) done(this.config);
            } else {
                try {
                    this.config = Object.assign({}, defaultConfig, JSON.parse(data));
                } catch (e) {
                    console.error(e);
                    this.config = defaultConfig;
                }
                if (done) return done(this.config);
            }
        });
    },

    saveConfig(done) {
        if (!this.config) {
            console.warn("Can't save null config");
            done();
        }
        fs.writeFile(path.join(__dirname, configFile), JSON.stringify(this.config), (err) => {
            if (err) console.error("Error on saveConfig:" + err);
            if (done) done(err);
        });
    }
};

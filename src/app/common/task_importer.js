"use strict";

const fs = require('fs');

const EnvVariableHandler = require('../api/env_variables_handler');

module.exports = {
    parseToJson(suites, version, globalEnv) {
        const parsedSuites = suites.map((suite) => suite.getData());
        const content = {
            "suites": parsedSuites,
            "version": version
        };
        if (globalEnv) {
            content.globalEnv = EnvVariableHandler.filterInvalidEnvVariables(globalEnv);
        }
        return JSON.stringify(content);
    },
    export(filename, suites, version, globalEnv) {
        return new Promise((resolve, reject) => {
            const content = this.parseToJson(suites, version, globalEnv);
            fs.writeFile(filename, content, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },
    import(filename) {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, 'utf-8', (err, data) => {
                if (err) return reject(err);
                try {
                    const result = JSON.parse(data);
                    return resolve(result);
                } catch (err2) {
                    return reject(err2);
                }
            });
        });
    }
};

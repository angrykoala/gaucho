"use strict";

const fs = require('fs');
const path = require('path');

const Suite = require('./suite');
const Task = require('./task');

function parseData(data) {
    return data.suites.map((suite) => {
        let result = new Suite(suite.title);
        result.tasks = suite.tasks.map((task) => {
            return new Task(task.title, task.path, task.command);
        });
        return result;
    });
}

const configFile = "../../tasks.json";

const defaultConfig = `{
    "suites": [{
        "title": "My Project",
        "tasks": [{
            "title": "Install",
            "command": "npm install"
        }, {
            "title": "Test",
            "command": "npm test"
        }, {
            "title": "Another awesome task",
            "command": "echo 'The result of my awesome task'"

        }, {
            "title": "Start",
            "command": "npm start"

        }]
    }, {
        "title": "Suite 2",
        "tasks": [{
            "title": "Hello World 2",
            "command": "echo 'hello world'"
        }]
    }]
}`;

module.exports = {
    suites: [],
    loadConfig(done) {
        fs.readFile(path.join(__dirname, configFile), 'utf8', (err, data) => {
            if (err) {
                console.warn("tasks.json file not found");
                data = defaultConfig;
            }
            try {
                this.suites = parseData(JSON.parse(data));
                return done(this.suites);
            } catch (e) {
                console.error(e);
                this.suites = parseData(JSON.parse(defaultConfig));
                done(this.suites);
            }
        });
    },
    saveConfig(done) {
        let data = {
            suites: this.suites.map((suite) => {
                return suite.getData();
            })
        };

        fs.writeFile(path.join(__dirname, configFile), JSON.stringify(data), (err) => {
            if (err) console.error("Error on saveConfig:" + err);
            if (done) done(err);
        });
    }
};

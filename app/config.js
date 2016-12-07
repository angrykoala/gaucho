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

module.exports = {
    configFile: "../tasks.json",
    suites: [],
    loadConfig: function(done) {
        fs.readFile(path.join(__dirname, this.configFile), 'utf8', (err, data) => {
            if (err) return done(err);
            try {
                this.suites = parseData(JSON.parse(data));
                return done(null, this.suites);
            } catch (e) {
                done(e);
            }
        });
    },
    saveConfig: function(done) {
        let data = {
            suites: this.suites.map((suite) => {
                return suite.toJSON();
            })
        };

        fs.writeFile(path.join(__dirname, this.configFile), JSON.stringify(data), (err) => {
            if (err) console.error("Error on saveConfig:" + err);
            if (done) done();
        });


    }
};

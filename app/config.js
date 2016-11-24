const fs = require('fs');
const path = require('path');

const Suite = require('./suite');
const Task = require('./task');

module.exports = {
    configFile: "../tasks.json",
    loadConfig: function(done) {
        fs.readFile(path.join(__dirname, this.configFile), 'utf8', (err, data) => {
            if (err) return done(err);
            try {
                let suites = parseData(JSON.parse(data));
                return done(null, suites);
            } catch (e) {
                done(e);
            }
        });
    }
};

function parseData(data) {
    return data.suites.map((suite) => {
        let result = new Suite(suite.title);
        result.tasks = suite.tasks.map((task) => {
            return new Task(task.title, task.path, task.command);
        });
        return result;
    });
}

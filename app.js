"use strict";

const Suite = require('./app/suite.js');
const Task = require('./app/tasks.js');

const components = {
    "task-suite": require('./app/components/task-suite')
};

let data = require('./tasks.json');

function parseData(data) {
    return data.suites.map((suite) => {
        let result = new Suite(suite.title);
        result.tasks = suite.tasks.map((task) => {
            return new Task(task.title, task.path, task.command);
        });
        return result;
    });
}

let suites = parseData(data);

const app = new Vue({
    el: '#app',
    data: {
        suites: suites
    },
    components: components
});

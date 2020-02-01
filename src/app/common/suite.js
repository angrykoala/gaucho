"use strict";

const utils = require('./utils');
const constants = require('../../common/constants');

class Suite {
    constructor(title, tasks) {
        this.tasks = tasks || [];
        this.setTitle(title);
    }

    get length() {
        return this.tasks.length;
    }

    getTask(index) {
        return this.tasks[index];
    }

    addTask(task) {
        const title = this.getValidTaskName(task.title);
        task.title = title;
        this.tasks.push(task);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
    }

    replaceTask(index, task) {
        if (this.tasks[index].title !== task.title) {
            const title = this.getValidTaskName(task.title);
            task.title = title;
        }
        this.tasks.splice(index, 1, task);
    }

    stopAll() {
        const promises = this.tasks.map((task) => {
            if (!task.isRunning()) return Promise.resolve();
            else {
                return new Promise((resolve) => {
                    task.stop(() => {
                        resolve();
                    });
                });
            }
        });
        return Promise.all(promises);
    }

    runAll() {
        for (const task of this.tasks) {
            if (!task.isRunning()) task.run();
        }
    }

    setTitle(title) {
        this.title = utils.truncate(title || "", constants.maxSuiteNameLength);
    }

    getData() {
        return {
            title: this.title,
            tasks: this.tasks.map((task) => task.getData())
        };
    }

    getValidTaskName(name) {
        name = utils.truncate(name, constants.maxTaskNameLength);
        let index = 2;
        if (!this.existTaskName(name)) return name;
        while (this.existTaskName(`${name} (${index})`)) {
            index++;
        }
        return `${name} (${index})`;
    }

    existTaskName(name) {
        name = name.trim();
        return this.tasks.find(task => task.title === name) !== undefined;
    }

    isDuplicate(name) {
        name = name.trim();
        return this.tasks.filter(task => task.title === name).length >= 2;
    }

    clone() {
        const taskClones = this.tasks.map(t => t.clone());
        return new Suite(this.title, taskClones);
    }
}

module.exports = Suite;

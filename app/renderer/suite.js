"use strict";

class Suite {
    constructor(title) {
        this.title = title || "";
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
    }

    replaceTask(index, task) {
        this.tasks.splice(index, 1, task);
    }

    stopAll() {
        let promises = [];
        for (const task of this.tasks) {
            if (task.isRunning()) {
                promises.push(new Promise((resolve) => {
                    task.stop(() => {
                        resolve();
                    });
                }));
            }
        }
        return Promise.all(promises);
    }
    runAll() {
        for (const task of this.tasks) {
            if (!task.isRunning()) task.run();
        }
    }

    toJSON() {
        return {
            title: this.title,
            tasks: this.tasks.map((task) => {
                return task.toJSON();
            })
        };
    }
}

module.exports = Suite;

"use strict";

class Suite {
    constructor(title) {
        this.title = title || "";
        this.tasks = [];
    }
    
    get length(){
        return this.tasks.length;
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

    getData() {
        return {
            title: this.title,
            tasks: this.tasks.map((task) => {
                return task.getData();
            })
        };
    }
}

module.exports = Suite;

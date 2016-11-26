"use strict";

class Suite {
    constructor(title) {
        this.title = title || "";
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
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

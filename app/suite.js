class Suite {
    constructor(title) {
        this.title = title || "";
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

module.exports=Suite;

"use strict";

const path = require('path');

module.exports = {
    testResources: path.join(__dirname, "resources"),
    taskFiles: {
        helloWorld: "hello_world_task.js"
    }
};

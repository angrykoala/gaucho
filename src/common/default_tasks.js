"use strict";

module.exports = {
    suites: [{
        title: "Example tasks",
        tasks: [{
            title: "Hello World",
            command: 'echo "hello_world"'
        }, {
            title: "Run & Click me!",
            command: "echo 'Good boy!'"
        }, {
            title: "You can edit me",
            command: 'echo "Try clicking the pencil"'
        }]
    }, {
        title: "Here is another suite of tasks",
        tasks: [{
            title: "Hello World",
            command: "echo 'hello_world'"
        }, {
            title: "Date",
            command: "date"
        }, {
            title: "This task will fail",
            command: "fail!"
        }]
    }],
    globalEnv: []
};

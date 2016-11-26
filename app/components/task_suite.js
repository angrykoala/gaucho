"use strict";

const TaskCard = require('./task_card');
const TaskInput = require('./task_input');
const config = require('../config');

module.exports = {
    props: ['suite', 'id'],
    template: `
        <div v-bind:id="id" class="suite-tab">
            <ul class="collapsible" data-collapsible="accordion">
                <template v-for="task in suite.tasks">
                    <task-card v-bind:task="task"></task-card>
                </template>
                <task-input v-on:add="addTask"></task-input>
            </ul>
        </div>
    `,
    methods: {
        addTask: function(task) {
            this.suite.addTask(task);
            config.saveConfig();
        }

    },
    components: {
        "task-card": TaskCard,
        "task-input": TaskInput
    }
};

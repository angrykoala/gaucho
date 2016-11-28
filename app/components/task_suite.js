"use strict";

const TaskCard = require('./task_card');
const TaskInput = require('./task_input');
const config = require('../config');
const AppStatus = require('../app_status');

module.exports = {
    props: ['suite', 'id'],
    data: () => {
        return {
            AppStatus: AppStatus
        };

    },
    template: `
        <div v-bind:id="id" class="suite-tab">
            <ul class="collapsible" data-collapsible="accordion">
                <template v-for="(task,i) in suite.tasks">
                    <task-card v-bind:task="task" v-on:remove="removeTask(i)"></task-card>
                </template>
                <task-input v-on:add="addTask" v-if="AppStatus.editMode"></task-input>
            </ul>
        </div>
    `,
    methods: {
        addTask: function(task) {
            this.suite.addTask(task);
            config.saveConfig();
        },
        removeTask: function(i){
            this.suite.removeTask(i);
            config.saveConfig();            
        }

    },
    components: {
        "task-card": TaskCard,
        "task-input": TaskInput
    }
};

"use strict";

const taskCard = require('./task_card');
const addTask=require('./add_task');

module.exports = {
    props: ['suite', 'id'],
    data: () => {
        return {

        };
    },
    template: `
        <div v-bind:id="id">
            <ul class="collapsible" data-collapsible="accordion">
                <template v-for="task in suite.tasks">
                    <task-card v-bind:task="task"></task-card>
                </template>
                <add-task></add-task>
            </ul>
        </div>
    `,
    methods: {
        addTask: function(){
            
            
        }

    },
    components: {
        "task-card": taskCard,
        "add-task": addTask
    }
};

"use strict";

const EventEmitter = require('events');

const TaskCard = require('./task_card');
const TaskInput = require('./task_input');
const config = require('../config');
const AppStatus = require('../app_status');

module.exports = {
    props: ['suite', 'index'],
    data: () => {
        return {
            AppStatus: AppStatus,
            event: new EventEmitter()
        };

    },
    template: `
        <div v-bind:id="id" class="suite-tab">
            <ul class="collapsible" data-collapsible="accordion">
                <template v-for="(task,i) in suite.tasks">
                    <task-card v-bind:task="task" v-on:remove="removeTask(i)" v-bind:event="event"></task-card>
                </template>
                <task-input v-on:add="addTask" v-if="AppStatus.editMode"></task-input>
            </ul>
        </div>
    `,
    mounted: function() {
        AppStatus.events.on("run-suite", () => {
            if(this.index===AppStatus.activeSuite){
                this.event.emit("run");
            }
        });
        AppStatus.events.on("stop-suite", () => {
            if(this.index===AppStatus.activeSuite){
                this.event.emit("stop");
            }
        });
    },
    methods: {
        addTask: function(task) {
            this.suite.addTask(task);
            config.saveConfig();
        },
        removeTask: function(i) {
            this.suite.removeTask(i);
            config.saveConfig();
        }
    },
    computed: {
        id: function() {
            return "tab" + this.index;
        }

    },
    components: {
        "task-card": TaskCard,
        "task-input": TaskInput
    }
};

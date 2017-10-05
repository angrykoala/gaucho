"use strict";

const EventEmitter = require('events');
const Draggable = require('vuedraggable');

const TaskCard = require('./task_card');
const AddTask = require('./add_task');
const AppStatus = require('../app_status');

module.exports = {
    props: ['suite', 'index'],
    data() {
        return {
            AppStatus: AppStatus,
            event: new EventEmitter()
        };
    },
    components: {
        "task-card": TaskCard,
        "add-task": AddTask,
        "draggable": Draggable
    },
    template: `
        <div v-bind:id="id" class="no-margin">
            <draggable element="ul" :options="{draggable:'.task-card'}" style="margin-bottom:0; margin-top:0 " class="collapsible" data-collapsible="accordion" v-model="draggableTasks" @end="restructureTasks" :move="checkMove">
                <template v-for="(task,i) in suite.tasks">
                    <task-card v-bind:task="task" v-on:restructureTasks="restructureTasks" v-on:remove="removeTask(i)" v-on:edit="editTask(i, $event)" v-bind:event="event"></task-card>
                </template>
            <add-task v-bind:tasks="suite.tasks" v-on:add="addTask" v-if="showAddTab"></add-task>
            </draggable>
        </div>
    `,
    mounted() {
        AppStatus.events.on("run-suite", this.onRunSuite);
        AppStatus.events.on("stop-suite", this.onStopSuite);
        AppStatus.totalTasks += this.suite.length;
        
    },
    beforeDestroy() {
        AppStatus.events.removeListener("run-suite", this.onRunSuite);
        AppStatus.events.removeListener("stop-suite", this.onStopSuite);
    },
    methods: {
        checkMove() {
            return AppStatus.editMode;
        },
        restructureTasks(event) {
            const tasks = this.suite.tasks;
            const movedTask = tasks[event.oldIndex];
            this.event.emit("collapseTask");
            tasks.splice(event.oldIndex, 1);
            tasks.splice(event.newIndex, 0, movedTask);
            tasks.forEach(function(task, index) {
                this.editTask(index, task);
            }.bind(this));
        },
        addTask(task) {
            if (this.suite.length < AppStatus.maxTasksPerSuite) {
                this.suite.addTask(task);
                AppStatus.totalTasks++;
            }
        },
        removeTask(i) {
            this.suite.removeTask(i);
            this.$forceUpdate();
            AppStatus.totalTasks--;
        },
        editTask(i, task) {
            this.suite.replaceTask(i, task);
            this.$forceUpdate();
        },
        onRunSuite() {
            if (this.index === AppStatus.activeSuite) {
                this.event.emit("run");
            }
        },
        onStopSuite() {
            if (this.index === AppStatus.activeSuite) {
                this.event.emit("stop");
            }
        }
    },
    computed: {
        id() {
            return "tab" + this.index;
        },
        showAddTab() {
            return AppStatus.editMode && this.suite.length < AppStatus.maxTasksPerSuite;
        },
        draggableTasks() {
            return this.suite.tasks;
        }
    }
};

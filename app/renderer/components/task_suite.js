"use strict";

const EventEmitter = require('events');

const TaskCard = require('./task_card');
const AddTask = require('./add_task');
const AppStatus = require('../app_status');
const Draggable = require('vuedraggable');

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
            <ul style="margin-bottom:0; margin-top:0 " class="collapsible" data-collapsible="accordion">
                <draggable v-model="orderTasks" @end="reStructureTasks">
                    <template v-for="(task,i) in orderTasks">
                        <task-card v-bind:task="task" v-on:reStructureTasks="reStructureTasks" v-on:remove="removeTask(i)" v-on:edit="editTask(i, $event)" v-bind:event="event"></task-card>
                    </template>
                </draggable>
                <add-task v-bind:tasks="orderTasks" v-on:add="addTask" v-if="showAddTab"></add-task>
            </ul>
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
        reStructureTasks(order, task) {
            const tasks = this.suite.tasks;
            const currentIndex = tasks.indexOf(task);
            if (order === "desc") {
                if (tasks[currentIndex + 1]) {
                    tasks[currentIndex + 1].order += 1;
                    this.editTask(currentIndex + 1, tasks[currentIndex + 1]);
                }

                task.order -= 1;
                this.editTask(currentIndex, task);
            }
            if (order === "asc") {
                if (tasks[currentIndex - 1]) {
                    tasks[currentIndex - 1].order -= 1;
                    this.editTask(currentIndex - 1, tasks[currentIndex - 1]);
                }

                task.order += 1;
                this.editTask(currentIndex, task);
            }
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
        orderTasks() {
            return this.suite.tasks.sort((a, b) => b.order - a.order);
        }
    }
};

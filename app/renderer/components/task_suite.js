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
            <draggable element="ul" :options="{draggable:'.task-card'}" style="margin-bottom:0; margin-top:0 " class="collapsible" data-collapsible="accordion" v-model="orderTasks" @end="reStructureTasks" :move="checkMove">
                <template v-for="(task,i) in orderTasks">
                    <task-card v-bind:task="task" v-on:reStructureTasks="reStructureTasks" v-on:remove="removeTask(i)" v-on:edit="editTask(i, $event)" v-bind:event="event"></task-card>
                </template>
            <add-task v-bind:tasks="orderTasks" v-on:add="addTask" v-if="showAddTab"></add-task>
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
            if (AppStatus.editMode) {
                return true;
            }
            return false;
        },
        reStructureTasks(event) {
            const tasks = this.suite.tasks.sort((a, b) => a.order - b.order);
            const movedTask = tasks[event.oldIndex];
            const targetedTask = tasks[event.newIndex];

            if (targetedTask) {
              movedTask.order = event.newIndex + 1;
              this.editTask(event.oldIndex, movedTask);

              targetedTask.order = event.oldIndex + 1;
              this.editTask(event.newIndex, targetedTask);
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
            return this.suite.tasks.sort((a, b) => a.order - b.order);
        }
    }
};

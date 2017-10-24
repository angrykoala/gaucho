"use strict";

const EventEmitter = require('events');
const Draggable = require('vuedraggable');

const TaskCard = require('./task_card');
const AddTask = require('./add_task');
const AppStatus = require('../app_status');


const draggableOptions = {
    draggable: '.task-card',
    handle: '.collapsible-header.edit-mode',
    filter: '.btn',
};

module.exports = {
    props: ['suite', 'index'],
    data() {
        return {
            AppStatus: AppStatus,
            event: new EventEmitter(),
            draggableOptions: draggableOptions
        };
    },
    components: {
        "task-card": TaskCard,
        "add-task": AddTask,
        "draggable": Draggable
    },
    template: `
        <div v-bind:id="id" class="no-margin">
            <div class="row" v-if="emptySuite">
                <div class="grey-text text-lighten-1 section center-align" >You can add tasks by pressing the <i class="material-icons unselectable-text">mode_edit</i> button at the top</div>
            </div>
            <draggable v-else class="collapsible task-list" data-collapsible="accordion" element="ul" v-bind:options="draggableOptions" v-model="suite.tasks" @start="onDragStart">
                <template v-for="(task,i) in suite.tasks">
                    <task-card v-bind:task="task" v-on:remove="removeTask(i)" @edit="editTask(i, $event)" v-bind:event="event"></task-card>
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
        onDragStart(){
            this.event.emit("collapseTask");
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
            return `tab${this.index}`;
        },
        showAddTab() {
            return AppStatus.editMode && this.suite.length < AppStatus.maxTasksPerSuite;
        },
        emptySuite() {
            return this.suite.tasks.length === 0 && !AppStatus.editMode;
        }
    }
};

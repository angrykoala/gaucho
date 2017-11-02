"use strict";

const EventEmitter = require('events');
const Draggable = require('vuedraggable');

const TaskCard = require('./task_card');
const AddTask = require('./add_task');
const AppStatus = require('../app_status');


const draggableOptions = {
    handle: '.collapsible-header.edit-mode',
    filter: '.no-draggable, .btn',
    preventOnFilter: false,
    group: 'tasks'
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
            <draggable element="ul"
            :options="draggableOptions"
            class="collapsible no-margin task-list"
            data-collapsible="accordion"
            v-model="suite.tasks"
            @start="onDragStart"
            @add="onTaskDraggedIn"
            :move="checkMove">
                <template v-for="(task,i) in suite.tasks">
                    <task-card v-bind:task="task" v-on:remove="removeTask(i)" @edit="editTask(i, $event)" v-bind:event="event"></task-card>
                </template>
            <add-task v-bind:tasks="suite.tasks" v-on:add="addNewTask" v-if="showAddTab"></add-task>
            </draggable>
            <div class="row" v-if="showEmptySuiteMessage">
                <div class="grey-text text-lighten-1 section center-align" >
                    You can add tasks by pressing the <i class="material-icons unselectable-text">mode_edit</i> button at the top
                </div>
            </div>
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
        checkMove(evt) {
            return !(evt.related.classList.contains('no-draggable') && evt.willInsertAfter);
        },
        onDragStart() {
            this.event.emit("collapseTask");
        },
        onTaskDraggedIn(evt){
            const task = this.suite.tasks[evt.newIndex]
            task.title = this.suite.getValidName(task.title)
        },
        addNewTask(task) {
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
        showEmptySuiteMessage() {
            return this.suite.tasks.length === 0 && !AppStatus.editMode;
        }
    }
};

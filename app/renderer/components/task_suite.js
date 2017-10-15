"use strict";

const EventEmitter = require('events');
const Draggable = require('vuedraggable');

const TaskCard = require('./task_card');
const AddTask = require('./add_task');
const AppStatus = require('../app_status');

module.exports = {
    props: ['suites', 'index'],
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
            <div class="row" v-if="hideMessage">
                <div class="grey-text text-lighten-1 section center-align" >You can add tasks by pressing the <i class="material-icons unselectable-text">mode_edit</i> button at the top</div>
            </div>
            <draggable v-show="suites[index].tasks.length > 0 || AppStatus.editMode" element="ul" 
            :options="{draggable:'.task-card', group:'tasks'}"
            class="collapsible no-margin" 
            data-collapsible="accordion" 
            v-model="suites[index].tasks"
            :move="checkMove">
                <template v-for="(task,i) in suites[index].tasks">
                    <task-card v-bind:task="task" v-on:remove="removeTask(i)" v-on:edit="editTask(i, $event)" v-bind:event="event"></task-card>
                </template>
            </draggable>
            <add-task v-bind:tasks="suites[index].tasks" v-on:add="addTask" v-if="showAddTab"></add-task>
        </div>
    `,
    mounted() {
        AppStatus.events.on("run-suite", this.onRunSuite);
        AppStatus.events.on("stop-suite", this.onStopSuite);
        AppStatus.totalTasks += this.suites[this.index].length;
    },
    beforeDestroy() {
        AppStatus.events.removeListener("run-suite", this.onRunSuite);
        AppStatus.events.removeListener("stop-suite", this.onStopSuite);
    },
    methods: {
        checkMove() {
            return AppStatus.editMode;
        },
        addTask(task) {
            if (this.suites[this.index].length < AppStatus.maxTasksPerSuite) {
                this.suites[this.index].addTask(task);
                AppStatus.totalTasks++;
            }
        },
        removeTask(i) {
            this.suites[this.index].removeTask(i);
            this.$forceUpdate();
            AppStatus.totalTasks--;
        },
        editTask(i, task) {
          this.suites[this.index].replaceTask(i, task);
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
            return AppStatus.editMode && this.suites[this.index].length < AppStatus.maxTasksPerSuite;
        },
        hideMessage() {
            return this.suites[this.index].tasks.length === 0 && !AppStatus.editMode;
        }
    }
};

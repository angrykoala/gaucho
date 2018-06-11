<template>
    <div class="task-card">
        <div class="columns is-mobile task-card-header" @click="taskSelected">
            <div class="column">
                <p>
                    <span v-if="editMode" class="drag-handle">
                        <span class="icon">
                            <i class="fas fa-equals"/>
                        </span>
                    </span>
                    <span v-show="open" class="icon">
                        <i class="fas fa-caret-down"/>
                    </span>
                    <span v-show="!open" class="icon">
                        <i class="fas fa-caret-right"/>
                    </span>
                    {{task.title}}
                </p>
            </div>
            <div class="column">
                <div class="columns is-mobile">
                    <div v-if="showTimer" class="column has-text-centered">
                        <p>{{executionTime}}</p>
                    </div>
                    <div class="column">
                        <button v-if="!editMode" :class="{'is-danger':running}" class="button is-info is-rounded is-outlined task-button" @click.stop="toggleRun">{{running? "Stop" : "Run"}}</button>
                        <button v-else class="button is-info is-rounded is-outlined task-button is-danger" @click.stop="deleteTask">Delete</button>
                    </div>
                    <div class="column">
                        <task-status :status="status"/>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="open" class="columns is-mobile">
            <div class="column task-output-wrapper">
                <div class="task-output" v-if="!editMode">
                    <pre>{{task.output}}</pre>
                </div>
                <task-form v-else :task="task" @save="saveTask"/>
            </div>
        </div>
    </div>
</template>

<script>
"use strict";

const utils = require('../../common/utils');
const DeleteConfirmationAlert = require('../api/app_alerts').DeleteConfirmationAlert;


const components = {
    "task-status": require('./task_status.vue'),
    "task-form": require('./task_form.vue')
};

module.exports = {
    props: ["task", "open", "index"],
    components: components,
    computed: {
        running() {
            return this.task.isRunning();
        },
        executionTime() {
            if (this.task.beginTime === null) return "-";
            return utils.generateTimeString(this.task.elapsedTime);
        },
        showTimer() {
            return this.$store.state.userConfig.showTimer;
        },
        editMode() {
            return this.$store.state.editMode;
        },
        status() {
            return this.task.status;
        }
    },
    methods: {
        toggleRun() {
            if (this.running) this.stop();
            else this.run();
        },
        run() {
            this.$store.dispatch("runTask", this.index);
        },
        stop() {
            this.$store.dispatch("stopTask", {index: this.index});
        },
        taskSelected() {
            this.$emit("selected");
        },
        deleteTask() {
            const confirmationAlert = new DeleteConfirmationAlert("You will not be able to recover this task after deletion!");
            confirmationAlert.toggle().then(() => {
                this.stop();
                this.$emit('delete');
            }, () => {});

        },
        saveTask(task) {
            this.stop();
            this.$emit("save", task);
            this.taskSelected();
        }
    }
};
</script>


<style lang="scss" scoped>
.task-button{
    width: 80px;
}

.column{
    margin-bottom: 0;
    margin-top: 0;
}

.task-output {
    background-color: #eeeeee;
    overflow-y: auto;
    overflow-x: hidden;
    height: 200px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: #e2e2e2;
    pre {
        overflow: hidden;
        white-space: pre-wrap;
        background-color: transparent;
        padding: 0.75rem;
    }
}

p{
    padding-top: 4px;
}


.task-card-header{
    margin-bottom: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 10px;
    padding-right:10px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: #e2e2e2;
}
</style>

<template>
    <div class="task-card" @contextmenu.stop="context()">
        <div class="columns is-mobile task-card-header" @click="taskSelected">
            <div class="column is-half">
                <div class="columns is-mobile title-column">
                    <div v-if="editMode" class="column is-narrow drag-handle-container">
                        <p>
                            <span class="drag-handle">
                                <span class="icon">
                                    <i class="fas fa-equals"></i>
                                </span>
                            </span>
                        </p>
                    </div>
                    <div class="column task-title" :class="{'with-drag-handler': editMode}">
                        <b>
                            <span v-show="open" class="icon">
                                <i class="fas fa-caret-down"></i>
                            </span>
                            <span v-show="!open" class="icon">
                                <i class="fas fa-caret-right"></i>
                            </span>
                            {{task.title}}
                        </b>
                    </div>
                </div>
            </div>
            <div class="column is-half">
                <div class="columns is-mobile task-actions">
                    <div v-if="showTimer" class="column has-text-centered task-action-text">
                        <p class="execution-time">
                            <span v-if="scheduled" class="icon is-small" title="scheduled">
                                <i class="fas fa-lg fa-clock"></i>
                            </span>
                            {{executionTime}}
                        </p>
                    </div>
                    <div class="column">
                        <button v-if="!editMode" :class="{'is-danger':running}" class="button is-primary task-button" @click.stop="toggleRun" :disabled="!runButtonEnabled">{{runButtonText}}</button>
                        <button v-else class="button is-primary task-button is-danger" @click.stop="deleteTask">Delete</button>
                    </div>
                    <div class="column task-action-text">
                        <task-status :status="status"></task-status>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="open" class="columns is-mobile task-output-container">
            <div class="column task-output-wrapper">
                <text-output v-if="!editMode" :text="task.output"></text-output>
                <task-form v-else :task="task" @save="saveTask"></task-form>
            </div>
        </div>
    </div>
</template>

<script>
"use strict";

const utils = require('../../common/utils');
const {
    DeleteConfirmationAlert
} = require('../../api/app_alerts');

const schedulerModal = require('../../api/scheduler_modal');
const ContextMenu = require('../../api/context_menu');

const components = {
    "task-status": require('./task_status.vue'),
    "task-form": require('./task_form.vue'),
    "text-output": require('../common/text_output')
};

module.exports = {
    props: ["task", "open", "index"],
    components: components,
    data() {
        return {
            runButtonEnabled: true
        };
    },
    computed: {
        running() {
            return this.task.isRunning();
        },
        scheduled() {
            return this.task.isScheduled();
        },
        executionTime() {
            if (this.task.elapsedTime === null) return "-";
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
        },
        runButtonText() {
            if (this.scheduled || this.running) return "Stop";
            else return "Run";
        }
    },
    methods: {
        toggleRun() {
            if (this.running || this.scheduled) this.stop();
            else this.run();
        },
        run() {
            this.disableButton();
            this.$store.dispatch("runTask", this.index);
        },
        schedule(options) {
            this.$store.dispatch("scheduleTask", {
                index: this.index,
                seconds: options.seconds,
                repeat: options.repeat
            });
        },
        stop() {
            this.disableButton();
            this.$store.dispatch("stopTask", {
                task: this.index
            });
        },
        disableButton(ms = 100) {
            this.runButtonEnabled = false;
            setTimeout(() => { // Avoid run/stop/run race condition
                this.runButtonEnabled = true;
            }, ms);
        },
        taskSelected() {
            this.$emit("selected");
        },
        deleteTask() {
            const confirmationAlert = new DeleteConfirmationAlert("You will not be able to recover this task after deletion!");
            confirmationAlert.toggle().then(() => {
                this.stop();
                this.$emit('delete');
            }, () => {
                // Confirmation cancelled
            });
        },
        saveTask(task) {
            this.stop();
            this.$emit("save", task);
            this.taskSelected();
        },
        duplicateTask() {
            this.$emit("duplicate");
        },
        copyCommandTask() {
            this.$emit("copy-command");
        },
        context() {
            const cardMenu = new ContextMenu.CardMenu(this.task);
            cardMenu.on("delete", () => {
                this.deleteTask();
            });
            cardMenu.on("run", () => {
                this.toggleRun();
            });
            cardMenu.on("stop", () => {
                this.toggleRun();
            });
            cardMenu.on("schedule", () => {
                schedulerModal("Schedule Task Execution").then((res) => {
                    this.schedule(res);
                }, () => {
                    // Schedule cancelled
                });
            });
            cardMenu.on("duplicate", () => {
                this.duplicateTask();
            });
            cardMenu.on("copy-command", () => {
                this.copyCommandTask();
            });
            cardMenu.toggle();
        }
    }
};
</script>


<style lang="scss" scoped>
.task-button {
    width: 80px;
}

.execution-time {
    padding-top: 4px;

    .icon {
      display: inline;
    }
}

.task-card-header {
    margin-bottom: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: #e2e2e2;
    height: 72px;

    .task-actions {
        margin-top: -0.5rem;

        .task-action-text {
            padding-top: 1rem;
        }
    }
}

.title-column {
    margin-top: 0;
}

.task-title {
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.with-drag-handler {
        padding-left: 0;
    }
}

.drag-handle-container{
    padding-right: 0;
}

.task-output-container{
    margin-top: 0;

    .task-output-wrapper {
        width: 100%;
        padding-top: 0;
    }
}
</style>

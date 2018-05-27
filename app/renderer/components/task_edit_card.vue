<template>
    <div>
        <div class="columns is-mobile" @click="taskSelected">
            <div class="column is-two-thirds">
                <p>{{task.title}}</p>
            </div>
            <div class="column">
                <div class="columns is-mobile">
                    <div class="column">
                        <task-status :status="task.status" class="is-pulled-right"/>
                        <button class="button is-info is-rounded is-outlined task-button is-pulled-right is-danger" @click.stop="deleteTask">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="edit" class="columns is-mobile">
            <div class="column">
                <task-form :task="task" @save="saveTask"/>
            </div>
        </div>
    </div>
</template>

<script>
"use strict";

const DeleteConfirmationAlert = require('../api/app_alerts').DeleteConfirmationAlert;

const components = {
    "task-status": require('./task_status.vue'),
    "task-form": require('./task_form.vue')
};

module.exports = {
    props: ["task", "edit"],
    components: components,
    computed: {
        running() {
            return this.task.isRunning();
        }
    },
    methods: {
        deleteTask() {
            const confirmationAlert = new DeleteConfirmationAlert("You will not be able to recover this task after deletion!");
            confirmationAlert.toggle().then(() => {
                this.stop();
                this.$emit('delete');
            }, () => {});

        },
        stop() {
            this.task.stop();
        },
        taskSelected() {
            this.$emit("selected");
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
</style>

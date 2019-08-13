<template>
<div class="suite-list">
    <draggable v-model="currentSuiteTasks" v-bind="draggableOptions" @add="onTaskDraggedIn" class="draggable-tasks-list">
        <template v-for="(task, index) in currentSuiteTasks">
            <task-card :key="index" :task="task" :index="index" :open="selectedTask===index" @selected="selectTask(index)" @save="saveTask(index, $event)" @delete="deleteTask(index)" @duplicate="duplicateTask(index)" />
        </template>
    </draggable>
    <add-task-card v-if="canAddTask" :edit="selectedAddTask" @selected="selectAddTask()" @save="addTask" :open="selectedAddTask"></add-task-card>
    <p class="has-text-centered no-task-message" v-if="!editMode && currentSuiteTasks.length===0">No task in suite. <a @click="addNewTask">Try adding new tasks</a></p>
</div>
</template>


<script>
"use strict";

const AppSettings = require("../../../app_settings.json");

const components = {
    "task-card": require('./task_card.vue'),
    "add-task-card": require('./add_task_card.vue'),
    "draggable": require('vuedraggable')
};


module.exports = {
    props: ["suite"],
    components: components,
    data() {
        return {
            selectedTask: null,
            selectedAddTask: false
        };
    },
    computed: {
        currentSuiteTasks: {
            get() {
                const suite = this.$store.getters.suites[this.suite];
                return suite.tasks;
            },
            set(value) {
                this.$store.commit('updateSuiteTasks', {
                    suite: this.suite,
                    tasks: value
                });
            }
        },
        currentSuite() {
            return this.$store.getters.suites[this.suite];
        },
        editMode() {
            return this.$store.state.editMode;
        },
        canAddTask() {
            return this.editMode && this.currentSuite.length < AppSettings.maxTasksPerSuite;
        },
        draggableOptions() {
            return {
                handle: '.drag-handle',
                group: {
                    name: 'tasks',
                    put: this.canAddTask ? ["tasks"] : false // Only allow elements from "tasks" groups if caAddTask
                },
                disabled: !this.editMode
            };
        }
    },
    watch: {
        currentSuiteTasks: {
            immediate: true,
            handler() {
                this.selectedTask = null;
                this.selectedAddTask = false;
            }
        }
    },
    methods: {
        selectTask(index) {
            this.selectedAddTask = false;
            if (index === this.selectedTask) this.selectedTask = null;
            else this.selectedTask = index;
        },
        selectAddTask() {
            this.selectedTask = null;
            this.selectedAddTask = !this.selectedAddTask;
        },
        addTask(task) {
            this.$store.commit("addTask", {
                index: this.suite,
                task: task
            });
        },
        saveTask(index, task) {
            const updateData = {
                suite: this.suite,
                task: index,
                data: task
            };
            this.$store.commit("updateTask", updateData);
        },
        deleteTask(index) {
            this.$store.commit("deleteTask", {
                suite: this.suite,
                task: index
            });
        },
        addNewTask() {
            this.$store.commit("toggleEdit");
            this.selectAddTask();
        },
        onTaskDraggedIn(evt) {
            this.$store.commit("validateTaskName", {
                suite: this.suite,
                task: evt.newIndex
            });
        },
        duplicateTask(index) {
            this.$store.dispatch("duplicateTask", {
                suite: this.suite,
                task: index
            });
        }
    }
};
</script>


<style lang="scss" scoped>
.suite-list {
    padding-top: 0;
    padding-bottom: 0;
}

.no-task-message {
    margin-top: 10px;
}

.draggable-tasks-list {
    min-height: 10px;
}
</style>

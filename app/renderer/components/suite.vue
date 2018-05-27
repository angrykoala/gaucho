<template>
    <div>
        <template v-for="(task, index) in currentSuiteTasks">
            <task-card v-if="!editMode" :key="index" :task="task" :log="selectedTask===index" @selected="selectTask(index)"/>
            <task-edit-card v-else :key="index" :task="task" :edit="selectedTask===index" @selected="selectTask(index)" @save="saveTask(index, $event)" @delete="deleteTask(index)"/>
        </template>
    </div>
</template>


<script>
"use strict";

const components = {
    "task-card": require('./task_card.vue'),
    "task-edit-card": require('./task_edit_card.vue')
};

module.exports = {
    components: components,
    data() {
        return {
            selectedTask: null
        };
    },
    computed: {
        currentSuiteTasks() {
            const suite = this.$store.getters.suites[this.selectedSuite];
            return suite.tasks;
        },
        editMode() {
            return this.$store.state.editMode;
        },
        selectedSuite() {
            return this.$store.state.tasks.selectedSuite;
        }
    },
    watch: {
        currentSuiteTasks: {
            immediate: true,
            handler() {
                this.selectedTask = null;
            }
        }
    },
    methods: {
        selectTask(index) {
            if(index === this.selectedTask) this.selectedTask = null;
            else this.selectedTask = index;
        },
        saveTask(index, task) {
            const updateData = {
                suite: this.selectedSuite,
                task: index,
                data: task
            };
            this.$store.commit("updateTask", updateData);
        },
        deleteTask(index) {
            this.$store.commit("deleteTask", {
                suite: this.selectedSuite,
                task: index
            });
        }
    }
};

</script>

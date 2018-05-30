<template>
    <div class="suite-list">
        <template v-for="(task, index) in currentSuiteTasks">
            <task-card v-if="!editMode" :key="index" :task="task" :log="selectedTask===index" @selected="selectTask(index)" class="task-card"/>
            <task-edit-card v-else :key="index" :task="task" :edit="selectedTask===index" @selected="selectTask(index)" @save="saveTask(index, $event)" @delete="deleteTask(index)" class="task-card"/>
        </template>
    <add-task-card v-if="editMode" :edit="selectedAddTask" @selected="selectAddTask()" @save="addTask" class="task-card"/></div>
</template>


<script>
"use strict";

const components = {
    "task-card": require('./task_card.vue'),
    "task-edit-card": require('./task_edit_card.vue'),
    "add-task-card": require('./add_task_card.vue')
};

module.exports = {
    components: components,
    data() {
        return {
            selectedTask: null,
            selectedAddTask: false
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
                this.selectedAddTask = false;
            }
        }
    },
    methods: {
        selectTask(index) {
            this.selectedAddTask = false;
            if(index === this.selectedTask) this.selectedTask = null;
            else this.selectedTask = index;
        },
        selectAddTask() {
            this.selectedTask = null;
            this.selectedAddTask = !this.selectedAddTask;
        },
        addTask(task) {
            this.$store.commit("addTask", {
                index: this.selectedSuite,
                task: task
            });
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


<style lang="scss" scoped>
.suite-list{
    padding-top: 6px;
    padding-bottom: 6px;
}
.task-card{
    padding-top: 3px;
    padding-left: 10px;
    padding-right:10px;
}

</style>

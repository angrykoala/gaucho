<template>
    <div class="suite-list">
        <template v-for="(task, index) in currentSuiteTasks">
            <task-card :key="index" :task="task" :index="index" :open="selectedTask===index" @selected="selectTask(index)" @save="saveTask(index, $event)" @delete="deleteTask(index)"/>
        </template>
        <add-task-card v-if="editMode" :edit="selectedAddTask" @selected="selectAddTask()" @save="addTask" :open="selectedAddTask"/>
        <p class="has-text-centered no-task-message" v-if="!editMode && currentSuiteTasks.length===0">No task in suite. <a @click="toggleEdit">Try adding new tasks</a></p>
    </div>
</template>


<script>
"use strict";

const components = {
    "task-card": require('./task_card.vue'),
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
        },
        toggleEdit() {
            this.$store.commit("toggleEdit");
            this.selectAddTask();
        }
    }
};

</script>


<style lang="scss" scoped>
.suite-list{
    padding-top: 0;
    padding-bottom: 0;
}

.no-task-message{
    margin-top: 10px;
}

</style>

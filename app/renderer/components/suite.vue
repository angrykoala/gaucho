<template>
    <div class="suite-list">
        <draggable v-model="currentSuiteTasks" :options="draggableOptions" @add="onTaskDraggedIn" class="draggable-tasks-list">
            <template v-for="(task, index) in currentSuiteTasks">
                <task-card :key="index" :task="task" :index="index" :open="selectedTask===index" @selected="selectTask(index)" @save="saveTask(index, $event)" @delete="deleteTask(index)"/>
            </template>
        </draggable>
        <add-task-card v-if="editMode" :edit="selectedAddTask" @selected="selectAddTask()" @save="addTask" :open="selectedAddTask"/>
        <p class="has-text-centered no-task-message" v-if="!editMode && currentSuiteTasks.length===0">No task in suite. <a @click="toggleEdit">Try adding new tasks</a></p>
    </div>
</template>




<script>
"use strict";

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
                const suite = this.$store.getters.suites[this.selectedSuite];
                return suite.tasks;

            },
            set(value) {
                // const suite = this.$store.getters.suites[this.selectedSuite];
                // suite.tasks = value;
                this.$store.commit('updateTasks', {
                    suite: this.selectedSuite,
                    tasks: value
                });
            }
        },
        currentSuite() {
            return this.$store.getters.suites[this.selectedSuite];
        },
        editMode() {
            return this.$store.state.editMode;
        },
        selectedSuite() {
            return this.suite;
            // return this.$store.state.tasks.selectedSuite;
        },
        draggableOptions() {
            const basicOptions = {
                handle: '.drag-handle',
                group: 'tasks'
            };

            return Object.assign(basicOptions, {'disabled': !this.editMode});
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
        },
        onTaskDraggedIn(evt) {
            const task = this.currentSuite.tasks[evt.newIndex]; // todo: use a store
            if(this.currentSuite.isDuplicate(task.title)) {
                task.title = this.currentSuite.getValidName(task.title);
            }
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

.draggable-tasks-list{
    min-height: 10px;
}

</style>

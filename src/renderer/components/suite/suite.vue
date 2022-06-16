<template>
<!-- <div class="suite-list">
        <draggable v-model="currentSuiteTasks" v-bind="draggableOptions" @add="onTaskDraggedIn" class="draggable-tasks-list">
            <template v-for="(task, index) in currentSuiteTasks">
                <task-card
                    :key="index" :task="task" :index="index" :open="selectedTask===index"
                    @selected="selectTask(index)" @save="saveTask(index, $event)" @delete="deleteTask(index)"
                    @duplicate="duplicateTask(index)" @copy-command="copyTaskCommand(index)"
                >
                </task-card>
            </template>
        </draggable>
        <add-task-card v-if="canAddTask" :edit="selectedAddTask" @selected="selectAddTask()" @save="addTask" :open="selectedAddTask"></add-task-card>
        <p class="has-text-centered no-task-message" v-if="!editMode && currentSuiteTasks.length===0">No task in suite. <a @click="addNewTask">Try adding new tasks</a></p>
    </div> -->
    <task-card v-for="(task, index) in tasks" :key="index" :task="task"></task-card>
</template>


<script lang="ts">
import {
    defineComponent
} from 'vue';

import TaskCard from "./task_card.vue";

export default defineComponent({
    props: ["suite"],
    components: {
        "task-card": TaskCard
    },
    computed: {
        tasks() {
            return this.suite.tasks;
        }
    }
});
</script>

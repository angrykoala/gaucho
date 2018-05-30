<template>
    <div>
        <div class="columns is-mobile" @click="cardSelected">
            <div class="column">
                <p class="has-text-centered">Add New Task</p>
            </div>
        </div>
        <div v-if="edit" class="columns is-mobile">
            <div class="column">
                <task-form @save="saveTask"/>
            </div>
        </div>
    </div>
</template>

<script>
"use strict";
const components = {
    "task-form": require('./task_form.vue')
};
module.exports = {
    props: ["edit"],
    components: components,
    methods: {
        saveTask(task) {
            this.$emit("save", task);
        },
        cardSelected() {
            this.$emit("selected");
        }
    }

};

</script>

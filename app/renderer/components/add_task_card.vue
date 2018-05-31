<template>
    <div>
        <div class="columns is-mobile task-card" @click="cardSelected">
            <div class="column has-text-centered">
                <a>Add New Task</a>
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

<style lang="scss" scoped>
.column{
    margin-bottom: 0;
    margin-top: 0;
}
.task-card{
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

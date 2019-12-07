<template>
    <div class="task-form-wrapper">
        <div class="container is-fluid">
            <div class="field">
                <label class="label">Task Name*</label>
                <div class="control">
                    <input v-model="title" class="input" type="text">
                </div>
            </div>
            <div class="field">
                <label class="label">Command*</label>
                <div class="control">
                    <textarea v-model="command" class="textarea"></textarea>
                </div>
            </div>
            <div class="field">
                <label class="label">Path</label>
                <div class="control">
                    <input v-model="path" class="input" type="text" placeholder="Defaults to home">
                </div>
            </div>
            <env-variables-form v-model="env"></env-variables-form>
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button :disabled="!canSave" class="button is-primary save-button is-grouped-right" @click="saveTask">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
"use strict";

const Task = require('../../common/task');

const components = {
    "env-variables-form": require('./env_variables_form.vue')
};

module.exports = {
    props: ['task'],
    components: components,
    data() {
        return {
            title: "",
            command: "",
            path: "",
            env: []
        };
    },
    computed: {
        canSave() {
            return Boolean(this.title && this.command);
        }
    },
    watch: {
        task: {
            immediate: true,
            handler() {
                this.onTaskUpdate();
            }
        }
    },
    methods: {
        saveTask() {
            if (this.canSave) {
                this.$emit('save', new Task(this.title, this.path, this.command, this.env));
                this.clear();
            }
        },
        clear() {
            this.title = "";
            this.command = "";
            this.path = "";
            this.env = [];
        },
        onTaskUpdate() {
            if (this.task) {
                this.title = this.task.title;
                this.command = this.task.command;
                this.path = this.task.path;
                this.env = this.task.env;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.save-button{
    width: 80px;
}
.container{
    padding-top: 10px;
}
.task-form-wrapper{
    border-bottom-style: solid;
    border-bottom-width: 1px;
    padding-bottom: 15px;
}
</style>

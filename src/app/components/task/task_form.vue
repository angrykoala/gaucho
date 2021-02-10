<template>
    <div class="task-form-wrapper">
        <div class="container is-fluid">
            <task-form-section title="Name*" :collapsable="false">
                <div class="control">
                    <input v-model="title" class="input" type="text" :maxlength="constants.maxTaskNameLength">
                </div>
            </task-form-section>

            <task-form-section title="Command*" :collapsable="false">
                <div class="control">
                    <textarea v-model="command" class="textarea"></textarea>
                </div>
            </task-form-section>

            <task-form-section title="Path" :collapsable="false">
                <input v-model="path" class="input" type="text" placeholder="Defaults to home">
            </task-form-section>

            <task-form-section :title="envVariablesTitle" :collapsable="true">
                <env-variables-form v-model="env"></env-variables-form>
            </task-form-section>
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
const constants = require('../../../common/constants');

const components = {
    "task-form-section": require('./task_form_section.vue'),
    "env-variables-form": require('../common/env_variables_form.vue')
};

module.exports = {
    props: ['task'],
    components: components,
    data() {
        return {
            title: "",
            command: "",
            path: "",
            env: [],
            constants: constants
        };
    },
    computed: {
        canSave() {
            return Boolean(this.title && this.command);
        },
        envVariablesTitle() {
            return `Env Variables (${this.env.length - 1})`;
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
                this.$emit('save', new Task({
                    title: this.title,
                    path: this.path,
                    command: this.command,
                    env: this.env
                }));
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
                this.env = this.task.cloneEnvVariables();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.save-button {
    width: 80px;
}
.container {
    padding-top: 10px;
}
.task-form-wrapper {
    border-bottom-style: solid;
    border-bottom-width: 1px;
    padding-bottom: 15px;
}
</style>

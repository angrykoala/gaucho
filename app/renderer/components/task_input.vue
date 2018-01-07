<template>
<div class="task-input-body">
    <div class="input-field">
        <input id="title" type="text" v-model="title">
        <label for="title">Task Title *</label>
    </div>
    <div class="input-field">
        <textarea id="command" class="materialize-textarea" v-model="command"></textarea>
        <label>Command *</label>
    </div>
    <div class="input-field">
        <input id="path" type="text" v-model="path">
        <label for="path">Path</label>
    </div>
    <div class="row task-input-send-row">
        <button class="btn waves-effect waves-light save-task-button" v-bind:class="{ disabled: !canSave }" v-on:click="saveTask">Save
            <i class="material-icons right">send</i>
        </button>
    </div>
</div>
</template>

<script>
"use strict";

const Task = require('../../common/task');
const Material = require('../api/materialize');

module.exports = {
    props: ['task'],
    data() {
        return {
            title: "",
            command: "",
            path: ""
        };
    },
    mounted() {
        this.onTaskUpdate();
    },
    watch: {
        task() {
            this.onTaskUpdate();
        }
    },
    methods: {
        saveTask() {
            if (this.canSave) {
                this.$emit('save', new Task(this.title, this.path, this.command));
                this.clear();
            }
        },
        clear() {
            this.title = this.command = this.path = "";
            this.$nextTick(() => {
                Material.updateInput();
            });
        },
        onTaskUpdate() {
            if (this.task) {
                this.title = this.task.title;
                this.command = this.task.command;
                this.path = this.task.path;
                this.$nextTick(() => {
                    Material.updateInput();
                });
            }
        }
    },
    computed: {
        canSave() {
            return this.title && this.command;
        }
    }
};
</script>

<style lang="scss" scoped>
.task-input-body {
    padding-bottom: 15px;
    padding-top: 10px;
    input {
        margin-bottom: 0;
    }
}
.save-task-button {
    margin-top: 8px;
    margin-right: 15px;
    float: right;
}
.task-input-send-row {
    margin-bottom: 0;
}

.input-field > label {
    cursor: default;
    user-select: none;
}
</style>

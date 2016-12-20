"use strict";

const Task = require('../task');
const Material = require('../materialize');

module.exports = {
    props: ['task'],
    data() {
        return {
            title: "",
            command: "",
            path: "",
        };
    },
    template: `
    <div class="task-input-body">
        <div class="input-field">
            <input id="title" type="text" v-model="title">
            <label for="title">Task Title</label>
        </div>
        <div class="input-field">
            <textarea id="command" class="materialize-textarea" v-model="command"></textarea>
            <label>Command</label>
        </div>
        <div class="input-field">
            <input id="path" type="text" v-model="path">
            <label for="path">Path</label>
        </div>
        <div class="row task-input-send-row">
        <button class="btn waves-effect waves-light save-task-button" v-on:click="saveTask">Save
            <i class="material-icons right">send</i>
        </button>   
        </div> 
    </div>
    `,
    mounted: function() {
        this.onTaskUpdate();
    },
    watch: {
        task: function() {
            this.onTaskUpdate();
        }
    },
    methods: {
        saveTask() {
            if (this.title && this.command) {
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
    }
};

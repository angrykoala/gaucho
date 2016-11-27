const Task = require('../task');
const Material = require('../materialize');

module.exports = {
    data() {
        return {
            title: "",
            command: "",
            path: "",
        };
    },
    template: `
    <li class="run-card">
        <div class="collapsible-header row center-align add-task-header">
            <strong>
                <span class="small material-icons">add</span>
                Add New Task
            </strong>
        </div>
        <div class="collapsible-body container add-task-body">
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
                <label for="path">Execution Path</label>
            </div>
            <div class="row">
            <button class="btn waves-effect waves-light col s3 offset-s8 add-task-button" v-on:click="addTask">Add
                <i class="material-icons right">send</i>
            </button>   
            </div> 
        </div>
    </li>    
    `,
    methods: {
        addTask() {
            if (this.title && this.command) {
                this.$emit('add', new Task(this.title, this.path, this.command));
                this.clear();
            }
        },
        clear() {
            this.title = this.command = this.path = "";
            this.$nextTick(() => {
                Material.updateInput();
            });
        }



    }

};

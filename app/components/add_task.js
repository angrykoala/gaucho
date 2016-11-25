module.exports = {
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
                <input id="title" type="text" class="validate">
                <label for="title">Task Title</label>
            </div>
            <div class="input-field">
                <input id="command" type="text" class="validate">
                <label for="command">Command</label>
            </div>
            <div class="input-field">
                <input id="path" type="text" class="validate">
                <label for="path">Execution Path</label>
            </div>
            <div class="row">
            <button class="btn waves-effect waves-light col s3 offset-s8 add-task-button">Add
                <i class="material-icons right">send</i>
            </button>   
            </div> 
        </div>
    </li>    
    `

};

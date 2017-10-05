"use strict";
const app = require('electron').remote;
const dialog = app.dialog;
const fs = require('fs');

const AppStatus = require('../app_status');
const SwitchForm = require('./switch_form');
const TaskConfig = require('../task_config');


module.exports = {
    data() {
        return {
            config: {
                bottomBar: AppStatus.config.bottomBar,
                animatedSpinner: AppStatus.config.animatedSpinner,
            }
        };
    },
    components: {
        "switch-form": SwitchForm,
    },
    template: `
    <div id="config-modal" class="modal bottom-sheet modal-fixed-footer">
        <div class="modal-content">
            <h3>Configuration</h3>
            <div class="container config-form">
                <switch-form v-bind:title="'Bottom Bar'" v-model="config.bottomBar"></switch-form>
                <switch-form v-bind:title="'Animated Progress Icon'" v-model="config.animatedSpinner"></switch-form>

                <div class="center-align buttons-form container">
                    <a class="waves-effect waves-light btn modal-action modal-close " v-on:click="clearTasks">Clear Tasks</a>
                    <label>Warning: This will remove all your suites and tasks</label>
                    <a class="waves-effect waves-light btn" v-on:click="resetConfig">Reset Configuration</a>
                     </br>
                     <a class="waves-effect waves-light btn" v-on:click="exportTasks">Export Tasks</a>
                    <label>Export the tasks.json to be able to load it into a different gaucho instance
                    </label>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" v-on:click="onClose" class="modal-action modal-close waves-effect waves-green btn-flat left">Close</a>
            <a href="#!" v-on:click="onSave" class="modal-action modal-close waves-effect waves-green btn-flat">Save</a>
        </div>
    </div>
    `,

  methods: {
    exportTasks(){
      let content = TaskConfig.getData() ;
      content = JSON.stringify(content) ;

        dialog.showSaveDialog({ filters: [

          { name: 'json', extensions: ['json'] }

        ]}, (filename)=> {

          if(filename){
                     fs.writeFile(filename, content, (err) => {
                       if(err) console.warn(err);
                     });
          }
        });
    },

    clearTasks() {
      TaskConfig.clearTasks();
      AppStatus.activeSuite = 0;
    },
    resetConfig() {
      this.config.bottomBar=true;
      this.config.animatedSpinner=true;
    },
    onClose() {
      this.config.bottomBar = AppStatus.config.bottomBar;
      this.config.animatedSpinner = AppStatus.config.animatedSpinner;
    },
    onSave() {
      AppStatus.config.bottomBar = this.config.bottomBar;
      AppStatus.config.animatedSpinner = this.config.animatedSpinner;
    }
  }
};

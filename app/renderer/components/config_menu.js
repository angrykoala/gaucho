"use strict";

const os = require('os');
const path = require('path');
const app = require('electron').remote;
const dialog = app.dialog;

const AppStatus = require('../app_status');
const SwitchForm = require('./switch_form');
const ShortcutsLearn = require('./shortcuts-learn');
const TasksHandler = require('../tasks_handler');
const TaskImporter = require('../../common/task_importer');
const DeleteConfirmationAlert = require('../api/app_alerts').DeleteConfirmationAlert;
const Materialize = require('../api/materialize');

module.exports = {
    data() {
        return {
            config: {
                bottomBar: AppStatus.config.bottomBar,
                animatedSpinner: AppStatus.config.animatedSpinner,
                showTimer: AppStatus.config.showTimer
            }
        };
    },
    components: {
        "switch-form": SwitchForm,
        "shortcuts-learn": ShortcutsLearn
    },
    template: `
    <div id="config-modal" class="modal bottom-sheet modal-fixed-footer">
        <div class="modal-content">
            <h3>Configuration</h3>
            <div class="container config-form">
                <switch-form v-bind:title="'Bottom Bar'" v-model="config.bottomBar"></switch-form>
                <switch-form v-bind:title="'Animated Progress Icon'" v-model="config.animatedSpinner"></switch-form>
                <switch-form v-bind:title="'Show Timer'" v-model="config.showTimer"></switch-form>

                <div class="center-align buttons-form container">
                    <a class="waves-effect waves-light btn " v-on:click="clearTasks">Clear Tasks</a>
                    <label>Warning: This will remove all your suites and tasks</label>
                    <a class="waves-effect waves-light btn" v-on:click="resetConfig">Reset Configuration</a>
                    </br>
                    <a class="waves-effect waves-light btn" v-on:click="exportTasks">Export Tasks</a>
                    <label>Export the tasks.json to be able to load it into a different gaucho instance</label>
                    <a class="waves-effect waves-light btn" v-on:click="importTasks">Import Tasks</a>
                    <label><em class="warning-text">ALERT! this will override your previous tasks</em></label>
                </div>

                <shortcuts-learn></shortcuts-learn>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" v-on:click="onClose" class="modal-action modal-close waves-effect waves-green btn-flat left">Close</a>
            <a href="#!" v-on:click="onSave" class="modal-action modal-close waves-effect waves-green btn-flat">Save</a>
        </div>
    </div>
    `,
    methods: {
        importTasks() {
            dialog.showOpenDialog({
                filters: [{
                    name: 'json',
                    extensions: ['json']
                }]
            }, (filenames) => {
                if (filenames && filenames[0]) {
                    const filename = filenames[0];
                    const confirmationAlert = new DeleteConfirmationAlert("Importing tasks will remove all current tasks.", {
                        confirmButtonText: "Yes, import tasks",
                        cancelButtonText: "No, cancel import"
                    });
                    confirmationAlert.toggle().then(() => {
                        TaskImporter.import(filename).then((data)=>{
                            TasksHandler.loadTasksFromData(data);
                            this._closeConfig();
                        }).catch((err)=>{
                            console.warn(err);
                        });
                    }, () => {});
                }
            });
        },
        exportTasks() {
            dialog.showSaveDialog({
                defaultPath: path.join(os.homedir(), "gtask.json"),
                filters: [{
                    extensions: ['json']
                }]
            }, (filename) => {
                if (filename) {
                    this._closeConfig();
                    TaskImporter.export(filename, TasksHandler.suites, AppStatus.version).catch((err) => {
                        console.warn(err);
                    });
                }
            });
        },
        clearTasks() {
            const confirmationAlert = new DeleteConfirmationAlert("You will not be able to recover these tasks after deletion!", {
                confirmButtonText: "Yes, clear them!",
                cancelButtonText: "No, keep them"
            });
            confirmationAlert.toggle().then(() => {
                TasksHandler.clearTasks();
                TasksHandler.addDefaultSuite();
                this.$nextTick(() => {
                    Materialize.selectTab("#navbar-tabs", `tab0`);
                    AppStatus.activeSuite = 0;
                });
                AppStatus.totalTasks = 0;
                this._closeConfig();
            }, () => {});
        },
        resetConfig() {
            this.config.bottomBar = true;
            this.config.animatedSpinner = true;
            this.config.showTimer = true;
        },
        onClose() {
            this.config.bottomBar = AppStatus.config.bottomBar;
            this.config.animatedSpinner = AppStatus.config.animatedSpinner;
            this.config.showTimer = AppStatus.config.showTimer;
        },
        onSave() {
            AppStatus.config.bottomBar = this.config.bottomBar;
            AppStatus.config.animatedSpinner = this.config.animatedSpinner;
            AppStatus.config.showTimer = this.config.showTimer;
        },
        _closeConfig(){
            this.onClose();
            Materialize.closeModals();
        }
    }
};

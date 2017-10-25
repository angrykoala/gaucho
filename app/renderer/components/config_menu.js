"use strict";

const AppStatus = require("../app_status");
const SwitchForm = require("./switch_form");
const TaskConfig = require("../task_config");

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
    "switch-form": SwitchForm
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
                    <a class="waves-effect waves-light btn modal-action modal-close " v-on:click="clearTasks">Clear Tasks</a>
                    <label>Warning: This will remove all your suites and tasks</label>
                    <a class="waves-effect waves-light btn" v-on:click="resetConfig">Reset Configuration</a>
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
    clearTasks() {
      TaskConfig.clearTasks();
      AppStatus.activeSuite = 0;
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
    }
  }
};

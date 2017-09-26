"use strict";

const AppStatus = require('../app_status');
const SwitchForm = require('./switch_form');

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
            <div class="container">
                <switch-form v-bind:title="'Bottom Bar'" v-model="config.bottomBar"></switch-form>
                <switch-form v-bind:title="'Animated Progress Icon'" v-model="config.animatedSpinner"></switch-form>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" v-on:click="onClose" class="modal-action modal-close waves-effect waves-green btn-flat left">Close</a>
            <a href="#!" v-on:click="onSave" class="modal-action modal-close waves-effect waves-green btn-flat">Save</a>
        </div>
    </div>
    `,

    methods: {
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

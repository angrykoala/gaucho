"use strict";

const AppStatus = require('../app_status');

const SwitchForm = require('./switch_form');

module.exports = {
    data() {
        return {
            AppStatus: AppStatus,
            config: {
                bottomBar: true,
                animatedSpinner: true,
                systemWindow: true
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
            <form>
                <switch-form v-bind:title="'Bottom Bar'" v-bind:value="true"></switch-form>
                <switch-form v-bind:title="'Animated Progress Icon'" v-bind:value="true"></switch-form>
                <switch-form v-bind:title="'System Window (recommended)'" v-bind:value="true"></switch-form>
            </form>
        </div>
        <div class="modal-footer">
            <a href="#!" v-on:click="onClose" class="modal-action modal-close waves-effect waves-green btn-flat left">Close</a>
            <a href="#!" v-on:click="onSave" class="modal-action modal-close waves-effect waves-green btn-flat">Save</a>
        </div>
    </div>
    `,

    methods: {
        onClose() {
            console.log("CLOSE");
        },
        onSave() {
            console.log("SAVE");
        }
    }
};

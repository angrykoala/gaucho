
<template>
    <div id="config-modal" class="modal bottom-sheet modal-fixed-footer">
        <div class="modal-content">
            <h3>Configuration</h3>
            <div class="container config-form">
                <switch-form :title="'Bottom Bar'" v-model="bottomBar"/>
                <switch-form :title="'Animated Progress Icon'" v-model="animatedSpinner"/>
                <switch-form :title="'Show Timer'" v-model="showTimer"/>

                <div class="center-align buttons-form container">
                    <a class="waves-effect waves-light btn " @click="clearTasks">Clear Tasks</a>
                    <label><em class="warning-text">Warning: This will remove all your suites and tasks</em></label>
                    <a class="waves-effect waves-light btn" @click="resetConfig">Reset Configuration</a>
                </br>
                    <a class="waves-effect waves-light btn" @click="exportTasks">Export Tasks</a>
                    <label>Export the tasks.json to be able to load it into a different gaucho instance</label>
                    <a class="waves-effect waves-light btn" @click="importTasks">Import Tasks</a>
                    <label><em class="warning-text">ALERT! this will override your previous tasks</em></label>
                </div>

                <shortcuts-learn/>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" @click="onClose" class="modal-action modal-close waves-effect waves-green btn-flat left">Close</a>
            <a href="#!" @click="onSave" class="modal-action modal-close waves-effect waves-green btn-flat">Save</a>
        </div>
    </div>
</template>


<script>
"use strict";

const os = require('os');
const path = require('path');
const app = require('electron').remote;
const dialog = app.dialog;

const DeleteConfirmationAlert = require('../api/app_alerts').DeleteConfirmationAlert;
const Materialize = require('../api/materialize');

const components = {
    "switch-form": require('../components/common/switch_form.vue'),
    "shortcuts-learn": require('../components/config_menu/shortcuts_learn.vue')
};

module.exports = {
    data() {
        return {
            bottomBar: this.$store.state.userConfig.bottomBar,
            animatedSpinner: this.$store.state.userConfig.animatedSpinner,
            showTimer: this.$store.state.userConfig.showTimer
        };
    },
    components: components,
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
                        return this.$store.dispatch("importTasks", filename).then(() => {
                            this._closeConfig();
                        });
                    }).catch((err) => {
                        console.warn(err);
                    });
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
                    this.$store.dispatch("exportTasks", filename).catch((err) => {
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
                return this.$store.dispatch("clearTasks").then(() => {
                    Materialize.selectTab("#navbar-tabs", `tab0`);
                    this.$store.state.activeSuite = 0;
                    this._closeConfig();
                });
            }, () => {});
        },
        resetConfig() {
            this.bottomBar = true;
            this.animatedSpinner = true;
            this.showTimer = true;
        },
        onClose() {
            this._loadConfig();
        },
        onSave() {
            if (this.bottomBar !== this.$store.state.userConfig.bottomBar) this.$store.commit("toggleBottomBar");
            if (this.animatedSpinner !== this.$store.state.userConfig.animatedSpinner) this.$store.commit("toggleAnimatedSpinner");
            if (this.showTimer !== this.$store.state.userConfig.showTimer) this.$store.commit("toggleShowTimer");
        },
        _closeConfig() {
            this.onClose();
            Materialize.closeModals();
        },
        _loadConfig() {
            this.bottomBar = this.$store.state.userConfig.bottomBar;
            this.animatedSpinner = this.$store.state.userConfig.animatedSpinner;
            this.showTimer = this.$store.state.userConfig.showTimer;
        }
    }
};
</script>

<style lang="scss" scoped>
.buttons-form {
    max-width: 230px;
    margin-top: 20px;
    .btn {
        width: 100%;
        margin-top: 10px;
    }
}

.config-form {
    max-width: 300px;
}

.warning-text {
    color: #26a69a;
}

#config-modal {
    max-height: 100%;
    height: 100%;
}
</style>

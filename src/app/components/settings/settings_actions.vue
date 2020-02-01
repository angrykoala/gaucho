<template>
    <div class="columns is-centered">
        <div class="column is-two-thirds">
            <button-item @select="resetSettings">Reset Settings</button-item>
            <button-item @select="exportTasks">Export Tasks</button-item>
            <button-item @select="importTasks" label="Warning: This will override your previous tasks">Import Tasks</button-item>
            <button-item @select="clearTasks" label="Warning: This will remove all your suites and tasks">Clear Tasks</button-item>
        </div>
    </div>
</template>


<script>
"use strict";

const os = require('os');
const path = require('path');
const app = require('electron').remote;
const dialog = app.dialog;

const {
    ImportTaskAlert,
    DeleteConfirmationAlert
} = require('../../api/app_alerts');

const components = {
    "button-item": require('./button_item.vue')
};

module.exports = {
    components: components,
    methods: {
        importTasks() {
            dialog.showOpenDialog({
                filters: [{
                    name: 'json',
                    extensions: ['json']
                }]
            }).then((dialogResult) => {
                if (dialogResult.filePaths && dialogResult.filePaths[0]) {
                    const filename = dialogResult.filePaths[0];
                    const confirmationAlert = new ImportTaskAlert();
                    confirmationAlert.toggle().then(() => {
                        return this.$store.dispatch("importTasks", filename).catch((err) => {
                            console.warn(err);
                        });
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
            }).then((dialogResult) => {
                if (dialogResult.filePath) {
                    this.$store.dispatch("exportTasks", dialogResult.filePath).catch((err) => {
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
                    this.$store.commit("toggleActiveSuite", 0);
                });
            }, () => {
                // In case of not confirmed
            });
        },
        resetSettings() {
            this.$emit("resetSettings");
        }
    }
};
</script>

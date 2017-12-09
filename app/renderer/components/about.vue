<template>
    <a v-on:click="openAbout" v-bind:href="'#tab3'">About</a>
</template>
<script>
"use strict";
const shell = require('electron').shell;
const AppAlert = require('../api/app_alerts').AppAlert;

module.exports = {
    data() {

        const aboutHtml =
            `<i>Version: ${this.$store.getters.version}</i>
            <p>Gaucho is Open Source software licensed under GNU GPL V3, it can be downloaded for free at:</br>
            <a v-on:click="openLink" href="#">https://github.com/angrykoala/gaucho</a></p>`;

        return {
            canOpenLink: true,
            aboutModal: new AppAlert("<h4>Gaucho</h4>", {
                showCloseButton: true,
                confirmButtonColor: "#ee6e73",
                confirmButtonText: "Close"
            }).html(aboutHtml)
        };
    },
    methods: {
        openAbout() {
            this.aboutModal.toggle();
        },
        openLink() {
            if (this.canOpenLink) {
                this.canOpenLink = false;
                shell.openExternal('https://github.com/angrykoala/gaucho', {}, (err) => {
                    if (err) console.error(err);
                    this.canOpenLink = true;
                });
            }
        }
    }
};
</script>

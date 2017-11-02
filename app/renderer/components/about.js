"use strict";
const shell = require('electron').shell;
const AppStatus = require('../app_status');
const AppAlert = require('../api/app_alerts').AppAlert;


const aboutHtml = `<i>Version: ${AppStatus.version}</i>
    <p>Gaucho is Open Source software licensed under GNU GPL V3, it can be downloaded for free at:</br>
    <a v-on:click="openLink" href="#">https://github.com/angrykoala/gaucho</a></p>`;

module.exports = {
    data() {
        return {
            canOpenLink: true,
            aboutModal: new AppAlert("<h4>Gaucho</h4>", {
                showCloseButton: true,
                confirmButtonColor: "#ee6e73",
                confirmButtonText: "Close"
            }).html(aboutHtml)
        };
    },
    template: `<a v-on:click="openAbout">About</a>`,
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

"use strict";
const shell = require('electron').shell;
const AppStatus = require('../app_status');
const AppAlert = require('../app_alert');

module.exports = {
    data() {
        return {
            version: AppStatus.version,
            canOpenLink: true
        };
    },
    template: `
      <a v-on:click="openAbout">About</a>
    `,
    methods: {
        openAbout() {
            AppAlert.toggle('<h4>Gaucho</h4>', '', {
                html: `<i>Version: ${AppStatus.version}</i>` +
                    '<p>Gaucho is Open Source software licensed under GNU GPL V3, it can be downloaded for free at:</br>' +
                    '<a v-on:click="openLink" href="#">https://github.com/angrykoala/gaucho</a></p>',
                showCloseButton: true,
                confirmButtonColor: "#ee6e73",
                confirmButtonText: 'Close'
            });
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

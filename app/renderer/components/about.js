"use strict";
const {
    shell
} = require('electron')
const AppStatus = require('../app_status');

module.exports = {
    data() {
        return {
            version: AppStatus.version,
            canOpenLink: true
        };
    },
    template: `
    <div id="about-modal" class="modal">
      <div class="modal-content">
        <h4>Gaucho</h4>
        <p>Version: {{version}} </p>
        <i>by @angrykoala</i>
        <p>Gaucho is Open Source software licensed under GNU GPL V3, it can be downloaded for free at <a v-on:click="openLink" href="#">https://github.com/angrykoala/gaucho</a></p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div>
    `,
    methods: {
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

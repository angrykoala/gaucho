"use strict";

const AppAlert = require('./app_alerts').AppAlert;

module.exports = function open(store) {
    const aboutHtml =
        `<i>Version: ${store.getters.version}</i>
        <p>Gaucho is Open Source software licensed under GNU GPL V3, it can be downloaded for free at:</br>
        <a href="#">https://github.com/angrykoala/gaucho</a></p>`;
    const modal = new AppAlert("<h4>Gaucho</h4>", {
        showCloseButton: false,
        confirmButtonText: "Close"
    }).html(aboutHtml);
    modal.toggle();
};

/* globals $, Materialize */
"use strict";

const AppConfig = require('../../common/app_config');

// Methods interface with jQuery
module.exports = {
    init() {
        this.updateCollapsible();
        this.updateTabs();
        this.updateDropdown();
        this.updateModals();
    },
    checkFirstTimeTap(selector) {
        const appConfig = new AppConfig.User();
        setTimeout(() => {
            if (!appConfig.get('firstVisit')) {
                $(selector).tapTarget('open');
                appConfig.set('firstVisit', true);
            }
        }, 1000);
    },
    updateCollapsible() {
        $('.collapsible').collapsible();
    },
    collapseHeader($el) {
        const elements = $el.getElementsByClassName('collapsible-header');
        if (elements[0]) {
            elements[0].classList.remove("active");
            this.updateCollapsible();
        }
    },
    updateTabs() {
        $('ul.tabs').tabs();
    },
    updateDropdown() {
        $('#navbar-menu-button').dropdown({
            inDuration: 150,
            outDuration: 100,
            hover: false,
            belowOrigin: true,
            alignment: 'left'
        });
    },
    updateInput() {
        Materialize.updateTextFields();
    },
    selectTab(selector, tabId) {
        $(selector).tabs('select_tab', tabId);
    },
    updateModals() {
        $('.modal').modal();
    },
    closeModals() {
        $('#config-modal').modal('close');
    },
    toggleNavBarMenu() {
        $('#navbar-menu-button').click();
    }
};

"use strict";

//Methods interface with jQuery
/* jshint ignore:start */
module.exports = {
    init() {
        this.updateCollapsible();
        this.updateTabs();
        this.updateDropdown();
        this.updateModals();
    },
    updateCollapsible() {
        $('.collapsible').collapsible();
    },
    updateTabs() {
        $('ul.tabs').tabs();
    },
    updateDropdown() {
        $('.navbar-menu-button').dropdown({
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
    }
};

/* jshint ignore:end */

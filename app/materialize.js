"use strict";

//Methods interface with jQuery

module.exports = {
    init() {
        this.updateCollapsible();
        this.updateTabs();
        this.updateDropdown();


    },
    updateCollapsible() {
        $(".collapsible").collapsible(); // jshint ignore:line
    },
    updateTabs() {
        $('ul.tabs').tabs(); // jshint ignore:line
    },
    updateDropdown() {
        $('.navbar-menu-button').dropdown({
            inDuration: 150,
            outDuration: 100,
            hover: false,
            gutter: 0,
            belowOrigin: true,
            alignment: 'left'
        });
    },
    updateInput() {
        Materialize.updateTextFields(); // jshint ignore:line
    },
    selectTab(selector, tabId) {
        $(selector).tabs('select_tab', tabId); // jshint ignore:line
    }
};

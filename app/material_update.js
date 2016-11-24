"use strict";

//Methods interface with jQuery

module.exports = {
    updateCollapsible() {
        $(".collapsible").collapsible();
    },
    updateTabs() {
        $('ul.tabs').tabs();
    }
};
